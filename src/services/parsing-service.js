/* global Defiant:false */

export default class ParsingService {
  constructor() {
  }

  $get() {
    return new ParsingService();
  }

  parseContent(content) {
    return content.children.reduce((acc, context) => {
      const frameName = context.element.content.data.value;
      const frameData = context.children.reduce((childAcc, contextFrame) => {
        childAcc.push(this.getFrameData(contextFrame));
        return childAcc;
      }, []);
      acc.set(frameName, frameData);
      return acc;
    }, new Map());
  }

  getContentItems(sectionsArray, maxItems = null, itemCount = 0) {
    return sectionsArray.reduce((acc, sectionElement) => {
      if (sectionElement.children) {
        acc = acc.concat(this.convertToSectionItems(sectionElement.children));
      }

      if (this.hasChildSections(sectionElement) && (maxItems === null || itemCount <= maxItems)) {
        return acc.concat(this.getContentItems([].concat(sectionElement.children), maxItems, acc.length));
      } else {
        return acc;
      }
    }, []);
  }

  convertToSectionItems(contentElementsArray) {
    return contentElementsArray.reduce((acc, contentElement) => {
      if (contentElement.item.type === "Content") {
        const sectionItem = {
          id: contentElement.item.data.contentId.data.valueCellId,
          title: contentElement.item.data.title,
          url: contentElement.url
        };
        acc.push(sectionItem);
      }
      return acc;
    }, []);
  }

  hasChildSections(sectionElement) {
    return angular.isDefined(sectionElement.children.find((sectionChild) => {
      return (sectionChild.item.type === "Classification");
    }));
  }

  getFrameData(contextFrame) {
    const preparedContentFrame = Defiant.getSnapshot(contextFrame);

    let contentChapter, contentIntro, contentId, contentParagraphs = [];
    const paragraphs = [];
    const title = ParsingService.getFirstArrayValue(JSON.search(preparedContentFrame, '(//*[attribute]/value/title | //*[attribute="name"]/value/name)[1]'));
    const type = ParsingService.getFirstArrayValue(JSON.search(preparedContentFrame, '(//*[attribute]/attribute)[1]'));
    const classification = ParsingService.getFirstArrayValue(contextFrame.element.classifications);
    const contentMaturity = ParsingService.getFirstArrayValue(JSON.search(preparedContentFrame, '(//*[attribute="pattern"]/value/maturity)[1]'));

    if (contextFrame.element.id.data.valueCellId) {
      contentId = contextFrame.element.id.data.valueCellId;
      contentParagraphs = JSON.search(preparedContentFrame, '//*[contentType="Section"]/..');
    } else if (contextFrame.element.id.data.instanceCellId) {
      contentId = contextFrame.element.id.data.instanceCellId;
      contentParagraphs = JSON.search(preparedContentFrame, '//*[contentType="Section"]/..')[0].children;
    }

    const contentIdObject = contextFrame.element.id;
    const contentPurpose = contextFrame.element.tags[0];
    const contentCandidate = ParsingService.getFirstArrayValue(JSON.search(preparedContentFrame, '(//element//*[attribute="pattern"]/../.. | //element//*[attribute="story"]/../.. | //element//*[attribute="force"]/../.. | //element//*[attribute="solution"]/../..)[1]'));

    if (contentCandidate) {
      contentIntro = ParsingService.getFirstArrayValue(JSON.search(contentCandidate, '(//content//value/pattern | //content//value/story | //content//value/force | //content//value/solution)[1]'));
      contentChapter = ParsingService.getFirstArrayValue(JSON.search(contentCandidate, '(//content//value/title)[1]'));
      //filter out valueId (paragraph), its already collected in /content/intro & /content/chapter
      contentParagraphs = contentParagraphs.filter((paragraph) => {
        return (JSON.search(paragraph, '//*[valueId="' + contentCandidate.id.data.valueId + '"]')).length === 0;
      });
    }

    const contentImage = ParsingService.getFirstArrayValue(JSON.search(preparedContentFrame, '(//*[attribute="image"]/value/href)[1]'));
    if (contentImage && contentImage.length > 0) {
      //filter first image already collected in /content/img
      contentParagraphs = contentParagraphs.filter((paragraph) => {
        if (paragraph.element.id.type === "ValueCell" && paragraph.children.length > 0) {
          return paragraph.children[0].element.content.data.value.href !== contentImage;
        } else if (paragraph.element.id.type === "Value") {
          return paragraph.element.content.data.value.href !== contentImage;
        } else {
          return true;
        }
      });
    }

    if (contentParagraphs.indexOf(undefined) === -1 && contentParagraphs.length > 0) {
      contentParagraphs.forEach((paragraph) => {
        const data = JSON.search(paragraph, '//*[contentType="Component"]/content/data');
        if (data.length > 1) {
          data[0].value.sidenote = data[1].value.description;
        }
        if (data[0]) {
          paragraphs.push(data[0]);
        }
      });
    } 

    return {
      // TODO - store as card ID the entire serialized element.id field
      id: ParsingService.getValueOrDefault(contentId),
      contentId: ParsingService.getValueOrDefault(contentIdObject),
      type: ParsingService.getValueOrDefault(type),
      description: ParsingService.getValueOrDefault(title),
      classification: ParsingService.getValueOrDefault(classification),
      content: {
        maturity: ParsingService.getValueOrDefault(contentMaturity),
        title: ParsingService.getValueOrDefault(title),
        intro: ParsingService.getValueOrDefault(contentIntro),
        chapter: ParsingService.getValueOrDefault(contentChapter),
        type: ParsingService.getValueOrDefault(type),
        img: ParsingService.getValueOrDefault(contentImage),
        paragraphs: paragraphs
      },
      purpose: contentPurpose
    };
  }

  /**
   * From the provided parsedContent, find all patterns in paragraph and in contentItems and store the contentId and title.
   *
   * @param parsedContent the content in which patterns are looked for.
   * @constructUrlFn a function reference to construct an url using the content-title.
   */
  findPatterns(parsedContent) {
    const valueType = "pattern";
    const contentArrays = Array.from(parsedContent.values());

    return contentArrays.reduce((contentAcc, contentArray) => {
      return contentArray.reduce((valueAcc, value) => {
        if (value.type === valueType) {
          valueAcc.push({
            contentId: value.id,
            pattern: value.description
          });
        }

        if (value.content && value.content.paragraphs && value.content.paragraphs.length > 0) {
          value.content.paragraphs.reduce((paragraphAcc, paragraph) => {
            if (paragraph.attribute === valueType) {
              paragraphAcc.push({
                contentId: value.id,
                pattern: paragraph.value.title
              });
            }
            return paragraphAcc;
          }, valueAcc);
        }
        return valueAcc;
      }, contentAcc);
    }, []);
  }

  static getValueOrDefault(value, defaultValue) {
    return (value) || (defaultValue || "");
  }

  static getFirstArrayValue(arrayValues) {
    return angular.isArray(arrayValues) && arrayValues[0];
  }

}

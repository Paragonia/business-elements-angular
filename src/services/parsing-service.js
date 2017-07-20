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
    let preparedContentFrame = Defiant.getSnapshot(contextFrame);

    let title = this.getFirstArrayValue(JSON.search(preparedContentFrame, '(//*[attribute]/value/title | //*[attribute="name"]/value/name)[1]'));
    let type = this.getFirstArrayValue(JSON.search(preparedContentFrame, '(//*[attribute]/attribute)[1]'));


    let contentImage = this.getFirstArrayValue(JSON.search(preparedContentFrame, '(//*[attribute="image"]/value/href)[1]'));
    let contentMaturity = this.getFirstArrayValue(JSON.search(preparedContentFrame, '(//*[attribute="pattern"]/value/maturity)[1]'));
    let contentChapter = this.getFirstArrayValue(JSON.search(preparedContentFrame, '(//*[attribute="story"]/value/title)[1]'));
    let contentIntro = this.getFirstArrayValue(JSON.search(preparedContentFrame, '//value/pattern | //value/story | //value/force | //value/solution | //*[attribute="name"]/value/name'));

    let paragraphs = [];
    let contentParagraphs = '';

    let contentId = '';
    if (contextFrame.element.id.data.valueCellId) {
      contentId = contextFrame.element.id.data.valueCellId;
      contentParagraphs = JSON.search(preparedContentFrame, '//*[contentType="Section"]/..');
    } else if (contextFrame.element.id.data.instanceCellId) {
      contentId = contextFrame.element.id.data.instanceCellId;
      contentParagraphs = JSON.search(preparedContentFrame, '//*[contentType="Section"]/..')[0].children;
    }

    if (contentImage && contentImage.length > 0) {
      //filter first image already collected
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
        let data = JSON.search(paragraph, '//*[contentType="Component"]/content/data');
        if (data.length > 1) {
          data[0].value.sidenote = data[1].value.description;
        }
        if (data[0]) {
          paragraphs.push(data[0]);
        }
      });
    } else {
      paragraphs.push({
        "attribute": "description",
        "value": {
          "description": "*Content coming soon...*"
        }
      })
    }

    return {
      // TODO - store as card ID the entire serialized element.id field
      id: contentId,
      type: ParsingService.getValueOrDefault(type),
      description: ParsingService.getValueOrDefault(title),
      classification: ParsingService.getValueOrDefault(contextFrame.element.classifications[0]),
      content: {
        maturity: contentMaturity,
        title: ParsingService.getValueOrDefault(title, ParsingService.getValueOrDefault(title)),
        intro: ParsingService.getValueOrDefault(contentIntro),
        chapter: ParsingService.getValueOrDefault(contentChapter),
        type: ParsingService.getValueOrDefault(type),
        img: ParsingService.getValueOrDefault(contentImage),
        paragraphs: paragraphs
      }
    };
  }

  static getValueOrDefault(value, defaultValue) {
    return (value) || (defaultValue || "");
  }

  getFirstArrayValue(arrayValues) {
    return angular.isArray(arrayValues) && arrayValues[0];
  }


}

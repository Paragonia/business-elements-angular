/* global Defiant:false */

export default class ParsingService {
  constructor() {
  }

  $get() {
    return new ParsingService();
  }

  parseContent(content) {
    const parsedContent = new Map();

    content.children.forEach((context) => {
      const contextFrameName = context.element.content.data.value;
      const contextFrameData = [];
      context.children.forEach((contextFrame) => {
        const frameData = this._getDataForFrame(contextFrame);
        contextFrameData.push(frameData);
      });
      parsedContent.set(contextFrameName, contextFrameData);
    });

    return parsedContent;
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
          title: contentElement.item.data.title
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

  _getDataForFrame(contextFrame) {
    const preparedContentFrame = Defiant.getSnapshot(contextFrame);

    const title = JSON.search(preparedContentFrame, '//*[attribute="story"]/value/title | //*[attribute="pattern"]/value/title | //*[attribute="name"]/value/name');
    const type = JSON.search(preparedContentFrame, '//*[attribute="story"]/attribute | //*[attribute="pattern"]/attribute | //*[attribute="name"]/attribute');

    let contentMaturity = '';
    let contentIntro = '';
    let contentChapter = '';
    let contentImage = '';

    if (JSON.search(preparedContentFrame, '//*[attribute="pattern"]').length > 0) {
      contentMaturity = JSON.search(preparedContentFrame, '//*[attribute="pattern"]/value/maturity');
      contentIntro = JSON.search(preparedContentFrame, '//*[attribute="pattern"]/value/pattern');
    } else if (JSON.search(preparedContentFrame, '//*[attribute="story"]').length > 0) {
      contentIntro = JSON.search(preparedContentFrame, '//*[attribute="story"]/value/story');
      contentChapter = JSON.search(preparedContentFrame, '//*[attribute="story"]/value/title');
    } else {
      contentIntro = JSON.search(preparedContentFrame, '//*[attribute="name"]/value/name');
    }

    contentImage = JSON.search(preparedContentFrame, '//*[attribute="image"]/value/href');
    const paragraphs = [];
    let contentParagraphs = '';

    let contentId = '';
    if (contextFrame.element.id.data.valueCellId) {
      contentId = contextFrame.element.id.data.valueCellId;
      contentParagraphs = JSON.search(preparedContentFrame, '//*[contentType="Section"]/..');
    } else if (contextFrame.element.id.data.instanceCellId) {
      contentId = contextFrame.element.id.data.instanceCellId;
      contentParagraphs = JSON.search(preparedContentFrame, '//*[contentType="Section"]/..')[0].children;
    }

    contentParagraphs = contentParagraphs.filter((paragraph) => {
      return paragraph.element.content.data.attribute !== "pattern" && paragraph.element.content.data.attribute !== "story";
    });

    if (contentImage.length > 0) {
      //filter first image already collected
      contentParagraphs = contentParagraphs.filter((paragraph) => {
        if (paragraph.element.id.type === "ValueCell" && paragraph.children.length > 0) {
          return paragraph.children[0].element.content.data.value.href !== contentImage[0];
        } else if (paragraph.element.id.type === "Value") {
          return paragraph.element.content.data.value.href !== contentImage[0];
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
        paragraphs.push(data[0]);
      });
    } else {
      paragraphs.push({
        "attribute": "description",
        "value": {
          "description": "*Content coming soon...*"
        }
      });
    }

    return {
      // TODO - store as card ID the entire serialized element.id field
      id: contentId,
      type: this._getValueOrDefault(type[0]),
      description: this._getValueOrDefault(title[0]),
      classification: this._getValueOrDefault(contextFrame.element.classifications[0]),
      content: {
        maturity: contentMaturity[0],
        title: this._getValueOrDefault(title[0], this._getValueOrDefault(title[0])),
        intro: this._getValueOrDefault(contentIntro[0]),
        chapter: this._getValueOrDefault(contentChapter[0]),
        type: this._getValueOrDefault(type[0]),
        img: this._getValueOrDefault(contentImage[0]),
        paragraphs: paragraphs
      }
    };
  }

  _getValueOrDefault(value, defaultValue) {
    if (value) {
      return value;
    } else {
      if (defaultValue) {
        return defaultValue;
      } else {
        return "";
      }
    }
  }


}

export default class PublicationCardController {
  constructor($scope, $sce, marked, uuid, api, valuePreviewService) {
    'ngInject';

    this.$scope = $scope;
    this.$sce = $sce;
    this.uuid = uuid;
    this.marked = marked;
    this.api = api;
    this.valuePreviewService = valuePreviewService;

    this.displayPDFImage = true;
    this.fullscreenCard = false;

    if (angular.isUndefined(this.$scope.showFooter)) {
      this.showFooter = false;
    }

    this.valuePreviewService.setAttributeForms(this.$scope.card.content.paragraphs, this.$scope.attributes);

    this.cardTitle = this.$scope.card.content.title;
    this.$scope.cardTitle = this.cardTitle.replace(/\s/g,'').toLowerCase();
    if (this.$scope.card.content.img && this.$scope.card.content.img.indexOf("resource:image") === 0) {
      this.$scope.card.content.img = this.getImgDownloadUri(this.$scope.card.content.img);
    }

    /*
    ContentType usage:
     name -> header, paragraph-header, landing-page, card-title
     image -> header-image, paragraph

     description -> paragraph, landing-page
     story -> header, paragraph, landing-page
     solution -> header, paragraph, landing-page
     pattern -> header, paragraph, landing-page
     force -> header, paragraph, landing-page

     nugget -> yellow footer link, landing-page
     */
    this.ContentType = {
      NAME: "name",
      DESCRIPTION: "description",
      IMAGE : "image",
      STORY : "story",
      SOLUTION : "solution",
      PATTERN : "pattern",
      FORCE : "force",
      NUGGET: "nugget"

    };
  }

  getImgDownloadUri(resourceUri) {
    return this.api.getDownloadUri(resourceUri, 'presentation');
  }

  isOfAttributeType(paragraph, type) {
    return paragraph && paragraph['attribute'] && paragraph['attribute'] === type;
  }

  containsNugget(paragraph) {
    return this.isOfAttributeType(paragraph, this.ContentType.NUGGET);
  }

  containsParagraphText(paragraph) {
    return angular.isDefined(this.getTextHtml(paragraph));
  }

  containsParagraphImage(paragraph) {
    return this.isOfAttributeType(paragraph, this.ContentType.IMAGE);
  }

  getMarkedHtml(value) {
    return this.marked(value);
  }

  getImgHtml(paragraph) {
    return '<img src="' + this.getImgDownloadUri(paragraph.value.href) + '" />';
  }

  getParagraphHeader(paragraph) {
    if (this.isOfAttributeType(paragraph, this.ContentType.PATTERN)
      || this.isOfAttributeType(paragraph, this.ContentType.STORY)
      || this.isOfAttributeType(paragraph, this.ContentType.FORCE)
      || this.isOfAttributeType(paragraph, this.ContentType.IMAGE)
      || this.isOfAttributeType(paragraph, this.ContentType.SOLUTION)) {
      return this.marked(paragraph.value.title);
    } else if (this.isOfAttributeType(paragraph, this.ContentType.NAME)) {
      return this.marked(paragraph.value.name);
    }
  }

  getTextHtml(paragraph) {
    if (this.isOfAttributeType(paragraph, this.ContentType.DESCRIPTION)) {
      return this.marked(paragraph.value[this.ContentType.DESCRIPTION]);

    } else if (this.isOfAttributeType(paragraph, this.ContentType.PATTERN)) {
      return this.marked(paragraph.value[this.ContentType.PATTERN]);

    } else if (this.isOfAttributeType(paragraph, this.ContentType.STORY)) {
      return this.marked(paragraph.value[this.ContentType.STORY]);

    } else if (this.isOfAttributeType(paragraph, this.ContentType.FORCE)) {
      return this.marked(paragraph.value[this.ContentType.FORCE]);

    } else if (this.isOfAttributeType(paragraph, this.ContentType.SOLUTION)) {
      return this.marked(paragraph.value[this.ContentType.SOLUTION]);
    }
  }

  getNuggetHtml(paragraph) {
    if (this.isOfAttributeType(paragraph, this.ContentType.NUGGET)) {
      return this.marked(paragraph.value[this.ContentType.NUGGET]);
    }
  }
  
  //LANDINGPAGE CARD
  getFirstTitle(card) {
    if (card.content.title) {
      return card.content.title;
    } else {
      const foundParagraph = card.content.paragraphs.find((paragraph) => this.containsParagraphHeader(paragraph));
      return this.getParagraphHeader(foundParagraph);
    }
  }

  getFirstDescription(card) {
    if (card.content.intro) {
      return card.content.intro;
    } else {
      const foundParagraph = card.content.paragraphs.find((paragraph) => this.containsParagraphText(paragraph));
      return this.getTextHtml(foundParagraph);
    }
  }

  getFirstNugget(card) {
    const foundParagraph = card.content.paragraphs.find((paragraph) => this.containsNugget(paragraph));
    return this.getNuggetHtml(foundParagraph);
  }

  //PUBLICATION DISPLAY CARD
  isTextPreview(paragraph) {
    if(paragraph) {
      if (paragraph.attribute !== 'image') {
        const textDefinition = paragraph.displayValue.form.find(definition => definition.type === 'text');
        if (textDefinition) {
          return true;
        }
      }
    }
  }

  isImagePreview(paragraph) {
    if(paragraph) {
      const imageDefinition = paragraph.displayValue.form.find(definition => definition.type === 'image');
      if (imageDefinition) {
        return true;
      }
    }
  }

  isYoutubePreview(paragraph) {
    if(paragraph) {
      const youtubeDefinition = paragraph.displayValue.form.find(definition => definition.type === 'youtube');
      if (youtubeDefinition) {
        return true;
      }
    }
  }

  isMarkdownPreview(paragraph) {
    if(paragraph) {
      const markdownDefinition = paragraph.displayValue.form.find(definition => definition.type === 'markdown');
      if (markdownDefinition) {
        return true;
      }
    }
  }

  isLinkPreview(paragraph) {
    if(paragraph) {
      const linkDefinition = paragraph.displayValue.form.find(definition => definition.type === 'hyperlink');
      if (linkDefinition) {
        return true;
      }
    }
  }

  isDocumentPreview(paragraph) {
    if(paragraph) {
      const documentDefinition = paragraph.displayValue.form.find(definition => definition.type === 'document');
      if (documentDefinition) {
        return true;
      }
    }
  }

  isRatingPreview(paragraph) {
    if(paragraph) {
      const ratingDefinition = paragraph.displayValue.form.find(definition => definition.type === 'rating');
      if (ratingDefinition) {
        return true;
      }
    }
  }

  //GENERAL CARD BEHAVIOR
  closeCard(card) {
    this.$scope.$emit("closePublishingCard", card);
  }

  toggleFullscreenCard() {
    this.fullscreenCard = !this.fullscreenCard;
  }

}



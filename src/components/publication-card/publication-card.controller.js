export default class PublicationCardController {
  constructor($scope, $location, $sce, marked, uuid, api, stringUtil) {
    'ngInject';

    this.$scope = $scope;
    this.$location = $location;
    this.$sce = $sce;
    this.uuid = uuid;
    this.marked = marked;
    this.api = api;
    this.stringUtil = stringUtil;

    this.displayPDFImage = true;

    /* copy link */
    this.sharableLink = "";
    this.showShareLinkHolder = false;
    this.linkCopied = false;


    this.showSocialShareButton = this.$scope.showSocialShareButton || false;
    this.showCloseCardButton = this.$scope.showCloseCardButton || false;
    this.showFullScreenButton = this.$scope.showFullScreenButton || false;
    this.showExitFullScreenButton = this.$scope.showExitFullScreenButton || false;
    this.hasNugget = false;

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
      NUGGET: "nugget",
      VIDEO: "video",
      YOUTUBE: "youtube",
      DOCUMENT: "document"

    };
  }

  getCardType(card) {
    const cardType = card.content.type;
    return (cardType === "name") ? "article" : cardType;
  }

  getMaturity(card) {
    const maturity = parseInt(card.content.maturity, 10);
    return new Array(maturity);
  }

  getMarkedContent(content) {
    return this.marked(content.replace(/&#13;/g, "\n"));
  }

  getImgHtml(paragraph, index) {
    let img = '';
    const sideNote = paragraph.value.sidenote;
    if (sideNote) {
      const cardTitle = this.cardTitle.replace(/\s/g,'').toLowerCase();
      const sideNoteId = "" + cardTitle + index;
      img =  '<figure><label class="margin-toggle" for="' + sideNoteId + '">&#8853;</label><input type="checkbox" id="' + sideNoteId + '" class="margin-toggle" /><span class="marginnote">' + this.marked(sideNote) + '</span><img src="' + this.getImgDownloadUri(paragraph.value.href) + '" /></figure>';
    } else {
      img = '<img src="' + this.getImgDownloadUri(paragraph.value.href) + '" />';
    }
    return img;
  }

  getPdfDownloadUri(card) {
    return this.api.getDownloadUri(card.content.resourceUri, 'original');
  }

  getImgDownloadUri(resourceUri) {
    return this.api.getDownloadUri(resourceUri, 'presentation');
  }

  getYoutubeUri(paragraph) {
    let youtubeId;
    if (this.isOfAttributeType(paragraph, this.ContentType.VIDEO)) {
      youtubeId = paragraph.value.provider.id;
    } else if (this.isOfAttributeType(paragraph, this.ContentType.YOUTUBE)) {
      youtubeId = paragraph.value.id;
    }
    return this.$sce.trustAsResourceUrl("https://www.youtube.com/embed/" + youtubeId);
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

  containsText(paragraph) {
    if(paragraph) {
      return !this.containsParagraphImage(paragraph) && !this.containsDocument(paragraph) && !this.containsVideo(paragraph);
    }
  }

  containsVideo(paragraph) {
    return this.isOfAttributeType(paragraph, this.ContentType.VIDEO) || this.isOfAttributeType(paragraph, this.ContentType.YOUTUBE);
  }

  containsParagraphImage(paragraph) {
    return this.isOfAttributeType(paragraph, this.ContentType.IMAGE);
  }

  containsDocument(paragraph) {
    return this.isOfAttributeType(paragraph, this.ContentType.DOCUMENT);
  }

  getMarkedHtml(value) {
    return this.marked(value);
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
      this.hasNugget = true;
      return this.marked(paragraph.value[this.ContentType.NUGGET]);
    }
  }

  //LANDINGPAGE CARD
  getFirstTitle(card) {
    if (card.content.title) {
      return this.marked(card.content.title);
    } else {
      const foundParagraph = card.content.paragraphs.find((paragraph) => this.containsParagraphText(paragraph));
      return this.getParagraphHeader(foundParagraph);
    }
  }

  getFirstDescription(card) {
    if (card.content.intro) {
      return this.marked(card.content.intro);
    } else {
      const foundParagraph = card.content.paragraphs.find((paragraph) => this.containsParagraphText(paragraph));
      return this.getTextHtml(foundParagraph);
    }
  }

  getFirstNugget(card) {
    const foundParagraph = card.content.paragraphs.find((paragraph) => this.containsNugget(paragraph));
    if(foundParagraph) {
      return this.getNuggetHtml(foundParagraph);
    } else {
      return '';
    }
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

  //Specification Deck
  isDocument(card) {
    return card.content.type === 'documentView';
  }

  getContentTextHtml(paragraph, index) {
    const mainTextReplaced = paragraph.value.description || "";
    if (paragraph.value.sidenote) {
      const cardTitle = this.cardTitle.replace(/\s/g,'').toLowerCase();
      const sideNoteId = "" + cardTitle + index;
      const sideNoteReplaced = paragraph.value.sidenote || "";
      return '<label class="margin-toggle" for="' + sideNoteId + '">&#8853;</label><input type="checkbox" id="' + sideNoteId + '" class="margin-toggle" /><span class="marginnote">' + this.marked(sideNoteReplaced) + '</span>' + this.marked(mainTextReplaced);
    } else {
      return this.marked(mainTextReplaced);
    }
  }

  //GENERAL CARD BEHAVIOR
  onNavigateTo(card, navigationType) {
    this.$scope.onNavigationLinkClick({card: card, navigationType: navigationType});
  }

  onShare(card) {
    this.linkCopied = false;
    const cardTitle = card.url;
    const exhibitionTitle = this.stringUtil.toUrlPath(card.selectedMenu);
    const absoluteUrl = this.$location.absUrl();
    this.sharableLink = absoluteUrl.substr(0, absoluteUrl.indexOf("#")) + "share/" + exhibitionTitle + "/" + cardTitle;

    this.showRequestTouchHolder = false;
    this.showShareLinkHolder = !this.showShareLinkHolder;
  }

  copySuccess() {
    this.linkCopied = true;
  }

  onCloseCard(card) {
    this.$scope.onCloseCardClick({card: card});
  }

  onFullScreenCard(card) {
    this.$scope.onFullScreenCardClick({card: card});
  }

  onClickDocumentLink(cardId, title, uri) {
    this.$scope.onDocumentLinkClick({cardId: cardId, title: title, uri: uri});
  }

  onClickPatternLink(cardId) {
    this.$scope.onPatternLinkClick({cardId: cardId});
  }
}



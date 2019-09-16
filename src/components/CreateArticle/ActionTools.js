/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import {
  BoldMark,
  ItalicMark,
  CodeMark,
  OrderedListMark,
  UnderlineMark,
  UnorderedListMark,
  StrikeThrough,
  BlockQuote,
  ListItem,
} from './ArticleTools';

export const Tools = (event, editor, next) => {
  if (!event.metaKey) return next();
  switch (event.key) {
    case 'b':
      editor.toggleMark('bold');
      return true;
    case 'i':
      editor.toggleMark('italic');
      return true;
    case 'u':
      editor.toggleMark('underline');
      return true;
    case '-':
      editor.toggleMark('strikethrough');
      return true;
    case '`':
      editor.toggleMark('code');
      return true;
    default:
      return next();
  }
};

export const Actions = (props, editor, next) => {
  switch (props.mark.type) {
    case 'bold':
      return <BoldMark {...props} />;
    case 'italic':
      return <ItalicMark {...props} />;
    case 'underline':
      return <UnderlineMark {...props} />;
    case 'strikethrough':
      return <StrikeThrough {...props} />;
    case 'code':
      return <CodeMark {...props} />;
    default:
      return next();
  }
};

/**
   * Render a Slate block.
   *
   * @param {Object} props
   * @return {Element}
   */

export const renderBlock = (props, editor, next) => {
  const {
    attributes, children, node
  } = props;

  switch (node.type) {
    case 'paragraph':
      return <p {...attributes}>{children}</p>;
    case 'quote':
      return <BlockQuote {...props} />;
    case 'unordered-list':
      return <UnorderedListMark {...props} />;
    case 'list-item':
      return <ListItem {...props} />;
    case 'ordered-list':
      return <OrderedListMark {...props} />;
    default:
      return next();
  }
};

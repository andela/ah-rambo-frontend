/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const BoldMark = ({ attributes, children }) => (
  <strong {...attributes}>{children}</strong>
);

export const ItalicMark = ({ attributes, children }) => (
  <em {...attributes}>{children}</em>
);

export const UnderlineMark = ({ attributes, children }) => (
  <u className="underline" {...attributes}>{children}</u>
);

export const CodeMark = ({ children, attributes }) => (
  <code {...attributes}>{children}</code>
);

export const OrderedListMark = ({ children, attributes }) => (
  <ol {...attributes}>{children}</ol>
);

export const UnorderedListMark = ({ children, attributes }) => (
  <ul {...attributes}>{children}</ul>
);

export const StrikeThrough = ({ children, attributes }) => (
  <del {...attributes}>{children}</del>
);

export const BlockQuote = ({ children, attributes }) => (
  <blockquote {...attributes}>{children}</blockquote>
);

export const ListItem = ({ children, attributes }) => (
  <li {...attributes}>{children}</li>
);

BoldMark.propTypes = {
  children: PropTypes.node.isRequired
};

ItalicMark.propTypes = {
  children: PropTypes.node.isRequired
};

CodeMark.propTypes = {
  children: PropTypes.node.isRequired,
  attributes: PropTypes.objectOf(PropTypes.string).isRequired
};

OrderedListMark.propTypes = {
  children: PropTypes.node.isRequired,
  attributes: PropTypes.objectOf(PropTypes.string).isRequired
};

UnorderedListMark.propTypes = {
  children: PropTypes.node.isRequired,
  attributes: PropTypes.objectOf(PropTypes.string).isRequired
};

UnderlineMark.propTypes = {
  children: PropTypes.node.isRequired
};

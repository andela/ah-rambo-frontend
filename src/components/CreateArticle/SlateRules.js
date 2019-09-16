/* istanbul ignore file */
import React from 'react';

/**
 * Tags to blocks.
 *
 * @type {Object}
 */

const BLOCK_TAGS = {
  p: 'paragraph',
  li: 'list-item',
  ul: 'bulleted-list',
  ol: 'numbered-list',
  blockquote: 'quote',
  pre: 'code',
  h1: 'heading-one',
  h2: 'heading-two',
  h3: 'heading-three',
  h4: 'heading-four',
  h5: 'heading-five',
  h6: 'heading-six'
};

/**
 * Tags to marks.
 *
 * @type {Object}
 */

const MARK_TAGS = {
  strong: 'bold',
  em: 'italic',
  u: 'underline',
  s: 'strikethrough',
  code: 'code'
};

/**
 * Serializer rules.
 *
 * @type {Array}
 */

const RULES = [
  {
    deserialize(el, next) {
      const block = BLOCK_TAGS[el.tagName.toLowerCase()];

      if (block) {
        return {
          object: 'block',
          type: block,
          data: {
            className: el.getAttribute('class')
          },
          nodes: next(el.childNodes)
        };
      }
    },
    serialize(obj, children) {
      if (obj.object === 'block') {
        switch (obj.type) {
          case 'paragraph':
            return <p className={obj.data.get('className')}>{children}</p>;
          case 'division':
            return <div className={obj.data.get('className')}>{children}</div>;
          default:
            break;
        }
      }
    }
  },
  {
    deserialize(el, next) {
      const mark = MARK_TAGS[el.tagName.toLowerCase()];

      if (mark) {
        return {
          object: 'mark',
          type: mark,
          data: {
            className: el.getAttribute('class')
          },
          nodes: next(el.childNodes)
        };
      }
    },
    serialize(obj, children) {
      if (obj.object === 'mark') {
        switch (obj.type) {
          case 'bold':
            return <strong className={obj.data.get('className')}>{children}</strong>;
          case 'italic':
            return <em>{children}</em>;
          case 'quote':
            return <blockquote>{children}</blockquote>;
          case 'underline':
            return <u>{children}</u>;
          case 'code':
            return (
              <pre>
                <code>{children}</code>
              </pre>
            );
          case 'unordered-list':
            return (
              <ul className={obj.data.get('className')}>
                <li>{children}</li>
              </ul>
            );
          case 'ordered-list':
            return (
              <ol className={obj.data.get('className')}>
                <li>{children}</li>
              </ol>
            );
          case 'strikethrough':
            return <del>{children}</del>;
          default:
        }
      }
    }
  },
  {
    deserialize(el, next) {
      if (el.tagName.toLowerCase() === 'p') {
        return {
          object: 'block',
          type: 'paragraph',
          data: {
            className: el.getAttribute('class')
          },
          nodes: next(el.childNodes)
        };
      }
    },
    serialize(obj, children) {
      if (obj.object === 'block' && obj.type === 'paragraph') {
        return <p className={obj.data.get('className')}>{children}</p>;
      }
    }
  },
  {
    deserialize(el, next) {
      if (el.tagName.toLowerCase() === 'pre') {
        const code = el.childNodes[0];
        const childNodes = code && code.tagName.toLowerCase() === 'code' ? code.childNodes : el.childNodes;

        return {
          object: 'block',
          type: 'code',
          nodes: next(childNodes)
        };
      }
    }
  }
];

export default RULES;

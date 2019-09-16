import { Tools, Actions, renderBlock } from './ActionTools';

const toolProps = key => ({
  editor: {
    toggleMark: jest.fn()
  },
  event: {
    preventDefault: jest.fn(),
    metaKey: 'Ctrl',
    key
  },
  next: jest.fn()
});

const actionProps = type => ({
  props: {
    mark: {
      type
    },
    node: {
      type
    },
    children: ['Hello'],
    attributes: {}
  },
  editor: {},
  next: jest.fn()
});

let instance;
let res;
let wrapper;
describe('Tools Test', () => {
  it('returns next when an event meta is not present', () => {
    instance = toolProps();
    delete instance.event.metaKey;
    Tools(instance.event, instance.editor, instance.next);
    expect(instance.next).toHaveBeenCalled();
    expect(instance.event.preventDefault).not.toHaveBeenCalled();
  });
  it('renders a tool if a meta is present and the event key is valid ', () => {
    instance = toolProps('i');
    res = Tools(instance.event, instance.editor, instance.next);

    expect(res).toBe(true);
    expect(instance.editor.toggleMark).toHaveBeenCalled();

    instance = toolProps('b');
    res = Tools(instance.event, instance.editor, instance.next);

    expect(res).toBe(true);
    expect(instance.editor.toggleMark).toHaveBeenCalled();

    instance = toolProps('u');
    res = Tools(instance.event, instance.editor, instance.next);
    expect(res).toBe(true);
    expect(instance.editor.toggleMark).toHaveBeenCalled();

    instance = toolProps('-');
    res = Tools(instance.event, instance.editor, instance.next);
    expect(res).toBe(true);
    expect(instance.editor.toggleMark).toHaveBeenCalled();

    instance = toolProps('`');
    res = Tools(instance.event, instance.editor, instance.next);
    expect(res).toBe(true);
    expect(instance.editor.toggleMark).toHaveBeenCalled();
  });
  it("doesn't renders a tool if a meta is present and the event key is invalid ", () => {
    instance = toolProps('zzz');
    res = Tools(instance.event, instance.editor, instance.next);
    expect(instance.next).toHaveBeenCalled();
    expect(instance.editor.toggleMark).not.toHaveBeenCalled();
  });
});

describe('Actions Test', () => {
  it('returns next when no type is specified', () => {
    instance = actionProps();
    Actions(instance.props, instance.editor, instance.next);
    expect(instance.next).toHaveBeenCalled();
  });

  it('renders a formated text if the mark type is valid ', () => {
    instance = actionProps('bold');
    wrapper = shallow(Actions(instance.props, instance.editor, instance.next));

    expect(wrapper.find('strong').length).toBe(1);

    instance = actionProps('italic');
    wrapper = shallow(Actions(instance.props, instance.editor, instance.next));

    expect(wrapper.find('em').length).toBe(1);

    instance = actionProps('underline');
    wrapper = shallow(Actions(instance.props, instance.editor, instance.next));

    expect(wrapper.find('u.underline').length).toBe(1);

    instance = actionProps('strikethrough');
    wrapper = shallow(Actions(instance.props, instance.editor, instance.next));
    expect(wrapper.find('del').length).toBe(1);

    instance = actionProps('code');
    wrapper = shallow(Actions(instance.props, instance.editor, instance.next));
    expect(wrapper.find('code').length).toBe(1);
  });
  it('renders a formated text if the block type is valid ', () => {
    instance = actionProps('paragraph');
    wrapper = shallow(renderBlock(instance.props, instance.editor, instance.next));

    expect(wrapper.find('p').length).toBe(1);

    instance = actionProps('quote');
    wrapper = shallow(renderBlock(instance.props, instance.editor, instance.next));

    expect(wrapper.find('blockquote').length).toBe(1);

    instance = actionProps('unordered-list');
    wrapper = shallow(renderBlock(instance.props, instance.editor, instance.next));

    expect(wrapper.find('ul').length).toBe(1);

    instance = actionProps('ordered-list');
    wrapper = shallow(renderBlock(instance.props, instance.editor, instance.next));

    expect(wrapper.find('ol').length).toBe(1);

    instance = actionProps('list-item');
    wrapper = shallow(renderBlock(instance.props, instance.editor, instance.next));
    expect(wrapper.find('li').length).toBe(1);
  });
});

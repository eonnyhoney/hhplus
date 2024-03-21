export function jsx(type, props = {}, ...children) {
  return {type, props, children}
}

export function createElement(node) {
  if (typeof node === 'string') {
    return document.createTextNode(node);
  } else {
    const $el = document.createElement(node.type);
    Object.entries(node.props || {})
      .filter(([attr, value]) => value)
      .forEach(([attr, value]) => (
        $el.setAttribute(attr, value)
      ));
    node.children.map(createElement).forEach(child => $el.appendChild(child));
    return $el;
  }
}

function updateAttributes(target, newProps, oldProps) {
  if (!newProps) {
    for (const key in oldProps) {
      target.removeAttribute(key);
    }
  } else {
    for (const [key, value] of Object.entries(newProps)) {
      if (oldProps[key] !== value) {
        target.setAttribute(key, value);
      }
    }
    for (const key in oldProps) {
      if (!newProps[key]) {
        target.removeAttribute(key);
      }
    }
  }
}

export function render(parent, newNode, oldNode = {}, index = 0) {
  if (!newNode && oldNode) {
    parent.removeChild(parent.childNodes[index]);
    return
  }

  if (newNode && !oldNode) {
    parent.appendChild(createElement(newNode));
    return
  }

  if (typeof newNode === 'string' && typeof oldNode === 'string' && newNode !== oldNode) {
    if (index < parent.childNodes.length) {
      parent.replaceChild(createElement(newNode), parent.childNodes[index]);
    } else {
      parent.appendChild(createElement(newNode));
    }
    return
  }

  if (newNode.type !== oldNode.type) {
    if (index < parent.childNodes.length) {
      parent.replaceChild(createElement(newNode), parent.childNodes[index]);
    } else {
      parent.appendChild(createElement(newNode));
    }
    return
  }

  updateAttributes(parent.childNodes[index], newNode.props, oldNode.props);

  const maxLength = Math.max(newNode.children?.length, oldNode.children?.length);
  for (let i = 0; i < maxLength; i++) {
    render(parent.childNodes[index], newNode.children[i], oldNode.children[i], i);
  }
}

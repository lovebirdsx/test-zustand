import ReactReconciler from 'react-reconciler';

const hostConfig = {
    // 创建DOM元素
    createInstance(type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
        const element = document.createElement(type);

        // 处理属性（样式、事件等）
        if (props.className) element.className = props.className;
        if (props.style) Object.assign(element.style, props.style);

        // 处理事件监听
        Object.keys(props).forEach(propName => {
            if (propName.startsWith('on') && typeof props[propName] === 'function') {
                const eventType = propName.toLowerCase().substring(2);
                element.addEventListener(eventType, props[propName]);
            } else if (propName !== 'children' && propName !== 'className' && propName !== 'style') {
                // 处理普通属性
                element.setAttribute(propName, props[propName]);
            } else if (propName === 'children') {
                if (typeof props[propName] === 'string' || typeof props[propName] === 'number') {
                    element.textContent = props[propName];
                }
            }
        });

        return element;
    },

    // 创建文本节点
    createTextInstance(text, rootContainerInstance, hostContext, internalInstanceHandle) {
        return document.createTextNode(text);
    },

    // 节点追加操作
    appendChild(parentInstance, child) {
        parentInstance.appendChild(child);
    },

    appendInitialChild(parent, child) {
        parent.appendChild(child);
    },

    appendChildToContainer(container, child) {
        container.appendChild(child);
    },

    // 新增：插入节点
    insertBefore(parentInstance, child, beforeChild) {
        parentInstance.insertBefore(child, beforeChild);
    },

    insertInContainerBefore(container, child, beforeChild) {
        container.insertBefore(child, beforeChild);
    },

    // 节点移除操作
    removeChild(parentInstance, child) {
        parentInstance.removeChild(child);
    },

    removeChildFromContainer(container, child) {
        container.removeChild(child);
    },

    // 属性更新
    prepareUpdate(instance, type, oldProps, newProps, rootContainerInstance, hostContext) {
        return newProps;
    },

    commitUpdate(instance, updatePayload, type, oldProps, newProps, internalInstanceHandle) {
        // 清除旧的事件监听器
        Object.keys(oldProps).forEach(propName => {
            if (propName.startsWith('on') && typeof oldProps[propName] === 'function') {
                const eventType = propName.toLowerCase().substring(2);
                instance.removeEventListener(eventType, oldProps[propName]);
            }
        });

        // 处理属性更新
        Object.keys(newProps).forEach(propName => {
            if (propName === 'className') {
                instance.className = newProps[propName];
            } else if (propName === 'style') {
                Object.assign(instance.style, newProps[propName]);
            } else if (propName.startsWith('on') && typeof newProps[propName] === 'function') {
                const eventType = propName.toLowerCase().substring(2);
                instance.addEventListener(eventType, newProps[propName]);
            } else if (propName !== 'children') {
                // 更新普通属性
                instance.setAttribute(propName, newProps[propName]);
            }
        });
    },

    // 文本内容更新
    commitTextUpdate(textInstance, oldText, newText) {
        textInstance.nodeValue = newText;
    },

    // 设置文本内容的接口
    setTextContent(node, text) {
        node.textContent = text;
    },

    // 根节点配置
    getRootHostContext(rootContainerInstance) {
        return {};
    },
    getChildHostContext(parentHostContext, type, rootContainerInstance) {
        return parentHostContext;
    },

    // 渲染相关配置
    shouldSetTextContent(type, props) {
        return typeof props.children === 'string' || typeof props.children === 'number';
    },

    // 清除容器内容
    clearContainer(container) {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    },

    // 重要的配置，告诉 reconciler 我们支持的功能
    supportsMutation: true,
    supportsHydration: false,
    supportsPersistence: false,

    // 时间调度相关
    now: Date.now,
    scheduleDeferredCallback: window.requestIdleCallback || setTimeout,
    cancelDeferredCallback: window.cancelIdleCallback || clearTimeout,

    // 这些都是需要提供的空方法
    prepareForCommit() { return null; },
    resetAfterCommit() { },
    finalizeInitialChildren(instance, type, props, rootContainerInstance, hostContext) {
        // 处理需要在初始渲染后执行的操作
        // 例如，如果需要自动聚焦
        if (props.autoFocus && (type === 'input' || type === 'textarea')) {
            return true;
        }
        return false;
    },

    // 如果返回了 true，则需要实现此函数
    commitMount(instance, type, newProps, internalInstanceHandle) {
        // 只有当 finalizeInitialChildren 返回 true 时才会被调用
        if (newProps.autoFocus) {
            instance.focus();
        }
    },
};

export const renderer = ReactReconciler(hostConfig);

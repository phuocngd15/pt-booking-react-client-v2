import type { RefObject, ReactNode } from 'react';
import React, { Suspense, memo, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useMatches, useOutlet } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import LayoutSpin from '@/components/LayoutSpin';

interface Props extends ComponentReactElement {
  maxLen?: number;
}
export const KeepAlive = memo(({ maxLen = 10 }: Props) => {
  const ele = useOutlet();
  const location = useLocation();
  const matches = useMatches();
  const activeName = location.pathname + location.search;
  const multiTabs = useAppSelector((state) => state.route.multiTabs);

  const containerRef = useRef<HTMLDivElement>(null);
  const [cacheReactNodes, setCacheReactNodes] = useState<Array<{ name: string; ele?: ReactNode }>>(
    [],
  );

  useEffect(() => {
    if (!activeName) {
      return;
    }
    const include = multiTabs.map((i) => i.key);
    setCacheReactNodes((reactNodes) => {
      // "Cache items exceeding the limit."
      if (reactNodes.length >= maxLen) {
        reactNodes = reactNodes.slice(0, 1);
      }
      // 添加
      const reactNode = reactNodes.find((res) => res.name === activeName);
      if (!reactNode) {
        reactNodes.push({
          name: activeName,
          ele: ele,
        });
      } else {
        // 权限判断
        const activeRoute = matches.find((i) => i.pathname === activeName);
        if (!activeRoute?.id || /([0-9]-[0-9])/.test(activeRoute?.id)) {
          const reactIndex = reactNodes.findIndex((res) => res.name === activeRoute?.pathname);
          if (reactIndex !== -1) reactNodes[reactIndex].ele = ele;
        }
      }
      // "Cache the synchronization of the route list and tab list."
      if (include) {
        return reactNodes.filter((i) => include.includes(i.name));
      }
      return reactNodes;
    });
  }, [activeName, maxLen, multiTabs, matches]);

  return (
    <>
      <div ref={containerRef} className="keep-alive" />
      {cacheReactNodes.map((i) => {
        return (
          <Component
            active={i.name === activeName}
            renderDiv={containerRef}
            name={i.name}
            key={i.name}
          >
            {i.ele}
          </Component>
        );
      })}
    </>
  );
});

export interface ComponentReactElement {
  children?: ReactNode | ReactNode[];
}

interface ComponentProps extends ComponentReactElement {
  active: boolean;
  name: string;
  renderDiv: RefObject<HTMLDivElement>;
}

export const Component: React.FC<ComponentProps> = ({ active, children, name, renderDiv }) => {
  const [targetElement] = useState(() => document.createElement('div'));
  const activatedRef = useRef(false);
  activatedRef.current = activatedRef.current || active;

  useEffect(() => {
    if (active) {
      renderDiv.current?.appendChild(targetElement);
    } else {
      try {
        renderDiv.current?.removeChild(targetElement);
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
  }, [active, name, renderDiv, targetElement]);

  useEffect(() => {
    targetElement.setAttribute('id', name);
  }, [name, targetElement]);

  return (
    <Suspense fallback={<LayoutSpin />}>
      {activatedRef.current && createPortal(children, targetElement)}
    </Suspense>
  );
};

import React, { useRef, useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { findPageInstById } from '@lingxiteam/engine-mobile/es/service/page';
import { DynamicPage, lcdpApi } from '@lingxiteam/engine-mobile';
import { Toast } from 'antd-mobile';
import VConsole from 'vconsole';

interface HomePageProps {}

const DPage = (props) => {
  const { query = {} } = props.location;
  const { defaultProps } = props.route;
  const [pageInst, setPageInst] = useState();
  const { pageId } = defaultProps || {};
  const debugRef = useRef<any>();

  const requestPageInst = () => {
    // 请求一次当前页面的具体数据
    if (pageId) {
      if (window.ignoreLoginPageIds?.includes(pageId)) {
        window.ignoreLoginFlag = 'T';
      }
      findPageInstById({ pageId }).then(async (r) => {
        if (!r) {
          Toast.fail(`没有查询到ID:${pageId}`);
          console.error(`没有查询到ID：${pageId}的页面实例数据，该页面将不会渲染！`);
          return;
        }
        setPageInst(r);
      });
    } else {
      console.error('该页面没有对应的pageId配置，将不会渲染！');
    }
  };

  useEffect(requestPageInst, [props.pageId]);

  useEffect(() => {
    const setPageNavBar = lcdpApi.getRefs('setPageNavBar');
    if (setPageNavBar) {
      setPageNavBar({
        pagePath: props.location.pathname,
        navBar: {
          hideNavBar: true,
        },
      });
    }
    return () => {
      if (debugRef.current) {
        debugRef.current.destroy();
      }
    };
  }, []);

  return (
    <>
      <DynamicPage
        {...props}
        pageInst={pageInst}
        pageId={pageId || query.pageId}
        appId={(window as any).appId || ''}
        pageDidLoad={(obj) => {
          if (obj.debug) {
            debugRef.current = new VConsole();
          }
        }}
      />
    </>
  );
};

export default DPage;

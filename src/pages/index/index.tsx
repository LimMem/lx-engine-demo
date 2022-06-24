import React, { useRef, useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { findPageInstById } from '@lingxiteam/engine-mobile/es/service/page';
import { DynamicPage, lcdpApi } from '@lingxiteam/engine-mobile';
import { Toast, Button } from 'antd-mobile';
import VConsole from 'vconsole';

interface HomePageProps {}

export type validateFieldsAndShowErrorParams = (e: any) => void;

export interface ForwardRefDynamicPage {
  validateAllForms: () => Promise<any>;
  validateFieldsAndShowError: (e: validateFieldsAndShowErrorParams) => void;
  [key: string]: any;
}

const DPage = (props) => {
  const { query = {} } = props.location;
  const { defaultProps } = props.route;
  const [pageInst, setPageInst] = useState();
  const { pageId = '845847207970054144' } = defaultProps || {};
  const debugRef = useRef<any>();
  const dynamicRef = useRef<ForwardRefDynamicPage>();
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

  // useEffect(requestPageInst, [props.pageId]);

  useEffect(() => {
    window.appId = '772790966277644288';
    const setPageNavBar = lcdpApi.getRefs('setPageNavBar');
    if (setPageNavBar) {
      setPageNavBar({
        pagePath: props.location.pathname,
        navBar: {
          hideNavBar: true,
        },
      });
    }
    requestPageInst();
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
        ref={dynamicRef}
        pageInst={pageInst}
        pageId={pageId || query.pageId}
        appId={772790966277644288}
        pageDidLoad={(obj) => {
          if (obj.debug) {
            debugRef.current = new VConsole();
          }
        }}
      />
      <Button
        onClick={() => {
          dynamicRef.current?.validateFieldsAndShowError?.((a) => {
            console.log(a);
          });
        }}
      >
        获取表单值
      </Button>
    </>
  );
};

export default DPage;

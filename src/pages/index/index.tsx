import React, { useRef, useState, useEffect } from 'react';
import { findPageInstById } from '@lingxiteam/engine-mobile/es/service/page';
import { DynamicPage, ForwardRefDynamicPage } from '@lingxiteam/engine-mobile';
import { Button } from 'antd-mobile';

const DPage = (props) => {
  const [pageInst, setPageInst] = useState();
  const pageId = '845847207970054144';
  const appId = '772790966277644288';
  const dynamicRef = useRef<ForwardRefDynamicPage>();
  const requestPageInst = () => {
    // 请求一次当前页面的具体数据
    findPageInstById({ pageId }).then(async (r) => {
      if (!r) {
        console.error(`没有查询到ID：${pageId}的页面实例数据，该页面将不会渲染！`);
        return;
      }
      setPageInst(r);
    });
  };

  useEffect(() => {
    // 这里为了内部接口使用，自己掉接口无需关注
    window.appId = appId;
    requestPageInst();
  }, []);

  return (
    <>
      <DynamicPage
        {...props}
        ref={dynamicRef}
        pageInst={pageInst}
        pageId={pageId}
        appId={appId}
        pageDidLoad={(obj) => {
          // 加载完成
        }}
      />
      <Button
        onClick={() => {
          dynamicRef.current?.validateFieldsAndShowError((a) => {
            console.log(a); // 表单调用回调
          });
        }}
      >
        获取表单值
      </Button>
    </>
  );
};

export default DPage;

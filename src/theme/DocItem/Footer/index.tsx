import React from 'react';
import Footer from '@theme-original/DocItem/Footer';
import type FooterType from '@theme/DocItem/Footer';
import type {WrapperProps} from '@docusaurus/types';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

//import GiscusComment
import GiscusComment from '@site/src/components/GiscusComment';

import { useDoc } from "@docusaurus/plugin-content-docs/client";

type Props = WrapperProps<typeof FooterType>;

const exportToPDF = async () => {
  // 找到文章内容元素
  const contentElement = document.querySelector('.theme-doc-markdown') as HTMLElement;
  
  if (!contentElement) {
    alert('未找到文章内容');
    return;
  }
  
  // 获取文件名
  let fileName = '文档';
  const h1 = document.querySelector('h1');
  if (h1?.textContent) {
    fileName = h1.textContent.trim();
  }
  
  try {
    // 确保元素可见
    const originalVisibility = contentElement.style.visibility;
    const originalPosition = contentElement.style.position;
    const originalWidth = contentElement.style.width;
    const originalMaxWidth = contentElement.style.maxWidth;
    
    contentElement.style.visibility = 'visible';
    contentElement.style.position = 'relative';
    contentElement.style.width = '794px';
    contentElement.style.maxWidth = '794px';
    
    // 强制重绘
    void contentElement.offsetHeight;
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // 使用html2canvas捕获内容
    const canvas = await html2canvas(contentElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      windowWidth: 794
    });
    
    // 恢复原始样式
    contentElement.style.visibility = originalVisibility;
    contentElement.style.position = originalPosition;
    contentElement.style.width = originalWidth;
    contentElement.style.maxWidth = originalMaxWidth;
    
    // 计算PDF尺寸
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    const contentWidth = pageWidth - margin * 2;
    const contentHeight = pageHeight - margin * 2;
    
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = contentWidth / imgWidth;
    
    // 计算整张图片在PDF中的高度
    const fullPdfHeight = imgHeight * ratio;
    
    // 简单分页：每页放满
    const pageCount = Math.ceil(fullPdfHeight / contentHeight);
    
    // 逐页处理
    let currentPdfY = 0; // PDF中的当前Y位置
    
    for (let pageIndex = 0; pageIndex < pageCount; pageIndex++) {
      // 如果不是第一页，添加新页面
      if (pageIndex > 0) {
        pdf.addPage();
      }
      
      // 计算这一页的高度
      const remainingHeight = fullPdfHeight - currentPdfY;
      const pageContentHeight = Math.min(remainingHeight, contentHeight);
      
      // 计算原图中要裁剪的部分
      const sourceY = currentPdfY / ratio;
      const sourceHeight = pageContentHeight / ratio;
      
      // 创建裁剪Canvas
      const cropCanvas = document.createElement('canvas');
      cropCanvas.width = imgWidth;
      cropCanvas.height = sourceHeight;
      const cropCtx = cropCanvas.getContext('2d');
      
      if (!cropCtx) {
        throw new Error('无法创建裁剪Canvas上下文');
      }
      
      // 裁剪原图
      cropCtx.drawImage(canvas, 0, sourceY, imgWidth, sourceHeight, 0, 0, imgWidth, sourceHeight);
      
      // 添加到PDF
      pdf.addImage(cropCanvas.toDataURL('image/jpeg', 0.95), 'JPEG', margin, margin, contentWidth, pageContentHeight);
      
      // 移动到下一页
      currentPdfY += contentHeight;
    }
    
    pdf.save(`${fileName.replace(/[\/\\]/g, '_').replace(/\s+/g, '_')}.pdf`);
  } catch (error) {
    console.error('PDF导出失败:', error);
    alert('PDF导出失败: ' + (error instanceof Error ? error.message : String(error)));
  }
};

export default function FooterWrapper(props: Props): JSX.Element {
  return (
    <>
      <Footer {...props} />
      
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
          onClick={exportToPDF}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          导出为PDF
        </button>
      </div>

      <GiscusComment />
    </>
  );
}
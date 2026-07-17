import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './404.module.css';

export default function NotFound() {
  return (
    <Layout title="页面未找到">
      <main className={styles.container}>
        <div className={styles.content}>
          <span className={styles.code}>404</span>
          <h1 className={styles.title}>页面未找到</h1>
          <p className={styles.description}>
            你访问的页面不存在或已被移动。
          </p>
          <div className={styles.actions}>
            <Link className="button button--primary button--lg" to="/">
              返回首页
            </Link>
            <Link className="button button--secondary button--lg" to="/docs/HD-RK3506-EVB/ProductIntroduction">
              查看文档
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}

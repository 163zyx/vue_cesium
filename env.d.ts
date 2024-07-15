/// <reference types="vite/client" />

// 找不到模块bug解决
declare module "*.vue" {
  import { App, defineComponent } from "vue";
  const component: ReturnType<typeof defineComponent> & {
      install(app: App): void;
  };
  export default component;
}
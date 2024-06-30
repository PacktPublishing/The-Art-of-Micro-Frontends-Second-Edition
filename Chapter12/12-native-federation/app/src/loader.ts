import { initFederation, loadRemoteModule } from "@softarc/native-federation";

export async function setup(manifest?: string | Record<string, string>) {
  await initFederation(manifest);

  const React = await import('react');
  const lazy = React.default.lazy;

  window.loadComponent = (remoteName, exposedModule) =>
    lazy(() =>
      loadRemoteModule({
        remoteName,
        exposedModule,
      })
    );
}

declare global {
  interface Window {
    loadComponent(remoteName: string, modulePath: string): React.FC<any>;
  }
}

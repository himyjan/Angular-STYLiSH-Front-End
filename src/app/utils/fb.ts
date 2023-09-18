declare global {
  interface Window {
    FB: any;
    FBAsyncInit: () => void;
  }
}

type FBResponse = {
  status: string;
  authResponse: {
    accessToken: string;
    expiresIn: number;
    signedRequest: string;
    userID: string;
  };
};

const fb = {
  loadScript() {
    return new Promise<void>((resolve) => {
      window.FBAsyncInit = () => {
        resolve();
      };
      (function (d, s, id) {
        var js: HTMLScriptElement,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s) as HTMLScriptElement;
        js.id = id;
        js.src = 'https://connect.facebook.net/zh_TW/sdk.js';
        if (fjs.parentNode) {
          fjs.parentNode.insertBefore(js, fjs);
        }
      })(document, 'script', 'facebook-jssdk');
    });
  },
  init() {
    window.FB.init({
      appId: '700590737403665',
      cookie: true,
      xfbml: true,
      version: 'v17.0',
    });
  },
  getLoginStatus() {
    return new Promise((resolve) => {
      window.FB.getLoginStatus((response: FBResponse) => {
        resolve(response);
      });
    });
  },
  login() {
    return new Promise((resolve) => {
      window.FB.login(
        (response: FBResponse) => {
          resolve(response);
        },
        { scope: 'public_profile,email' }
      );
    });
  },
  logout() {
    return new Promise<void>((resolve) => {
      window.FB.logout(() => {
        resolve();
      });
    });
  },
};

export default fb;

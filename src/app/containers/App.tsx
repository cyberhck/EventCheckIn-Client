import * as React from "react";
import {Helmet} from "react-helmet";
import {connect} from "react-redux";
import {createRouteNodeSelector, RouterState} from "redux-router5";
import {createSelector} from "reselect";
import {State as IRouteState} from "router5";
import {stylesheet} from "typestyle";
import {config as appConfig} from "../../../config";
import {Waves} from "../components/Waves";
import {setupCss} from "../helpers/setupCss";
import {Translator} from "../models/Translator";
import {ITranslator} from "../models/TranslatorInterfaces";
import {AboutPage} from "../pages/AboutPage";
import {CounterPage} from "../pages/CounterPage";
import {HomePage} from "../pages/HomePage";
import {StarsPage} from "../pages/StarsPage";
import {IStore} from "../redux/IStore";
import {translationsSelector} from "../selectors/translationsSelector";

setupCss();

const classNames = stylesheet({
  body: {
    backgroundColor: "rgba(255, 255, 255, 0.87)",
    borderColor: "rgba(0,0,0,0.09)",
    borderRadius: 3,
    boxShadow: "0 2px 8px rgba(0,0,0,0.09)",
    display: "block",
    height: "95vh",
    margin: "0 auto",
    width: "90%",
    zIndex: 1
  },
  container: {
    display: "flex",
    margin: 0,
    padding: 0
  },
  footer: {
    bottom: 0,
    height: "15vh",
    position: "absolute",
    width: "100%"
  }
});

interface IStateToProps {
  route: IRouteState;
  translations: {
    notFound: string;
  };
}

class App extends React.Component<IStateToProps> {
  private components: {[key: string]: React.ComponentClass} = {
    about: AboutPage,
    counter: CounterPage,
    home: HomePage,
    stars: StarsPage
  };

  public render(): JSX.Element {
    const {route, translations: {notFound}} = this.props;
    const segment = route ? route.name.split(".")[0] : undefined;
    return (
      <div className={classNames.container}>
        <div className={classNames.body}>
          <Helmet {...appConfig.app.head}/>
          {segment && this.components[segment] ? React.createElement(this.components[segment]) : <div>{notFound}</div>}
        </div>
        <div className={classNames.footer}>
          <Waves/>
        </div>
      </div>
    );
  }
}

const componentTranslationsSelector = createSelector(
  translationsSelector,
  (translations) => {
    const translator: ITranslator = new Translator(translations);
    return {
      notFound: translator.translate("Not found")
    };
  }
);

const mapStateToProps = (state: Pick<IStore, "router" | "settings">): IStateToProps & Partial<RouterState> => ({
  ...createRouteNodeSelector("")(state),
  translations: componentTranslationsSelector(state)
});

const connected = connect(mapStateToProps)(App);

export {classNames, connected as App, App as UnconnectedApp, mapStateToProps};

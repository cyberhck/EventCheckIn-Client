import {Input} from "antd";
import autobind from "autobind-decorator";
import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {createSelector} from "reselect";
import {stylesheet} from "typestyle";
import {UserDetailCard} from "../components/UserDetailCard";
import {Translator} from "../models/Translator";
import {ITranslator} from "../models/TranslatorInterfaces";
import {IStore} from "../redux/IStore";
import {IUserDetailState} from "../redux/modules/userDetail";
import {loadUserDetail} from "../redux/modules/userDetailActionCreators";
import {translationsSelector} from "../selectors/translationsSelector";

const classNames = stylesheet({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    margin: 0,
    padding: 0
  },
  input: {
  },
  inputContainer: {
  },
  userInfo: {
    flexGrow: 1
  }
});
const Search = Input.Search;
interface IStateToProps {
  translations: {
    hello: string;
  };
  userDetail: IUserDetailState;
}
interface IDispatchToProps {
  fetchUserData: (emailOrBadge: string) => void;
}
interface IState {
  badgeOrEmailInput: string;
}

class HomePage extends React.Component<IStateToProps & IDispatchToProps, IState> {
  public state: IState = {
    badgeOrEmailInput: ""
  };

  public render(): JSX.Element {
    return (
      <div className={classNames.container}>
        <div className={classNames.userInfo}>
          <UserDetailCard {...this.props.userDetail}/>
        </div>
        <div className={classNames.inputContainer}>
          <Search
            className={classNames.input}
            height={50}
            placeholder={"Scan Badge or Enter Email"}
            enterButton={true}
            onSearch={this.handleSearch}
            onChange={this.handleChange}
            value={this.state.badgeOrEmailInput}
            size={"large"}
          />
        </div>
      </div>
    );
  }
  @autobind
  public handleSearch(searchTerm: string): void {
    this.props.fetchUserData(searchTerm);
    this.setState({badgeOrEmailInput: ""});
  }

  @autobind
  public handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({badgeOrEmailInput: e.target.value});
  }
}

const componentTranslationsSelector = createSelector(
  translationsSelector,
  (translations) => {
    const translator: ITranslator = new Translator(translations);
    return {
      hello: translator.translate("Hello")
    };
  }
);
function mapDispatchToProps(dispatch: Dispatch): IDispatchToProps {
  return {
    fetchUserData: (emailOrBadge: string) => dispatch(loadUserDetail.invoke(emailOrBadge))
  };
}
function mapStateToProps(state: Pick<IStore, "settings" | "userDetail">): IStateToProps {
  return {
    translations: componentTranslationsSelector(state),
    userDetail: state.userDetail
  };
}

const connected = connect(mapStateToProps, mapDispatchToProps)(HomePage);
export {connected as HomePage, HomePage as UnconnectedHomePage, mapStateToProps};

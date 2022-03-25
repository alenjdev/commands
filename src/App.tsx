import "./App.scss";
import { Fleet, Device, Authentication } from "@formant/data-sdk";
import { CommandIssuer } from "./components/CommandIssuer";
import { Component, ReactNode } from "react";

interface IAppState {
  device: Device | undefined;
}

export class App extends Component<{}, IAppState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      device: undefined,
    };
  }

  public componentDidMount = async () => {
    if (await Authentication.waitTilAuthenticated()) {
      this.setState({ device: await Fleet.getCurrentDevice() });
    }
  };

  render(): ReactNode {
    const { device } = this.state;
    return (
      <div className="App">
        <CommandIssuer
          device={device!}
          label="Override Sick Safety"
          command="set.sick.status"
          params="override sick safety"
        />
        <CommandIssuer
          device={device!}
          params="reset sick"
          command="set.sick.status"
          label="reset sick"
        />
        <CommandIssuer
          device={device!}
          command="set.sick.status"
          params="switch safety field"
          label="Switch safety Fields"
        />
        <CommandIssuer
          device={device!}
          command="set.sick.status"
          params="reset all"
          label="Reset All"
        />
        <CommandIssuer
          device={device!}
          command="set.sick.status"
          params="autocalibrate"
          label="Autocalibrate"
        />
      </div>
    );
  }
}

export default App;

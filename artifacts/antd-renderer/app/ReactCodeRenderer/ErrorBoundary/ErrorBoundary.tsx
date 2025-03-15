import { Component, ErrorInfo } from "react";
import { ErrorDisplay } from "../ErrorDisplay";
import { ErrorBoundaryProps, ErrorBoundaryState } from "./interface";

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: null,
    };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
    this.setState({ errorMessage: error.message, errorInfo });
    this.props.onError(error.message);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    // Reset error state when files prop changes to allow retry
    if (
      this.state.hasError && 
      this.props.files !== prevProps.files
    ) {
      this.setState({
        hasError: false,
        errorMessage: null,
        errorInfo: null
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return <ErrorDisplay errorMessage={this.state.errorMessage} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

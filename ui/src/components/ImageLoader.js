import React, { Component } from 'react';
import puff from '../imgs/puff.svg';

const _loaded = {};

export class ImageLoader extends Component {

    // Initial state: image loaded stage
    state = {
        loaded: _loaded[this.props.src]
    };

    // define loading and loaded images classes via defaultProps
    static defaultProps = {
        className: "",
        loadingClassName: "img-loading",
        loadedClassName: "img-loaded"
    };

    onLoad = () => {
        _loaded[this.props.src] = true;
        this.setState({loaded: true});
    };

    render() {
        let { className, loadedClassName, loadingClassName} = this.props;
        className = `${className} ${this.state.loaded
            ? loadedClassName
            : loadingClassName}`;

        return (
            <img
                src={this.state.loaded ? this.props.src : puff}
                onClick={this.props.onClick}
                className={className}
                onLoad={this.onLoad}
                alt={this.props.alt || ""}
             />
        )
    }
}

export default ImageLoader

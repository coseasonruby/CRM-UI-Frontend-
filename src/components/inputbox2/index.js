import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';


class InputBox2 extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        className:'input form-line form-group',
        type: this.props.type || 'text',
        focused : false,
        not_blank : false
    }
    this.checkState = this.checkState.bind(this);
  }

  checkState() {
      if(this.props.value !== ""){
        this.setState({not_blank : true});
      }
      else {
        this.setState({not_blank : false}); 
      }
      this.setState({focused : !this.state.focused})
  }

  componentDidMount() {
      if (this.props.value !== "") {
          this.setState({not_blank: true});
      }
      else {
          this.setState({not_blank: false});
      }
  }

  componentWillReceiveProps(nextProps) {
      if(this.props.value !== nextProps.value) {
        if (nextProps.value !== "") {
            this.setState({not_blank: true});
        }
        else {
            this.setState({not_blank: false});
        }
    }
  }

  render() {
    let className = this.props.className + " " + this.state.className;
    let focused = "form-line "+ (this.state.focused? 'focused' : '') + ' ' + (this.state.not_blank? 'not_blank' : '')
    return (
            <div className="form-group form-group-lg form-float input2">
                <div className={focused}>
                    <input type="text" className="form-control" 
                          value={this.props.value}
                          onChange = {this.props.onChange}
                          type={this.props.type}
                          placeholder={this.props.placeholder}
                          id={this.props.id}
                          disabled={this.props.disabled}
                          onFocus= { ()=> this.setState({focused : true})}
                          onBlur = { () => this.checkState() }
                    />
                    <label className="form-label">{this.props.text}</label>
                </div>
            </div>
    );
  }
}

InputBox2.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  className : PropTypes.string
};

export default InputBox2;
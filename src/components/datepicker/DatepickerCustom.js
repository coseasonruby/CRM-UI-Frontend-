import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import './index.scss';

import '../../styles/assets/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css';
import '../../styles/assets/plugins/waitme/waitMe.css';
import '../../styles/assets/plugins/sweetalert/sweetalert.css';
import '../../styles/assets/plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js';
import '../../styles/assets/plugins/jquery-validation/jquery.validate.js';
import '../../styles/assets/plugins/jquery-steps/jquery.steps.js';
import '../../styles/assets/plugins/sweetalert/sweetalert.min.js';


class DatepickerCustom extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            validationMessage: this.props.validationMessage || 'This field is required',
            type: this.props.type || 'text',
            placeholder: this.props.placeholder || 'Mar 8'
        }

        this.onChanged = this.onChanged.bind(this);
    }


    componentDidMount() {
        let self = this;
        // initializing the date picker
        $('.'+this.props.unique).bootstrapMaterialDatePicker({
            format: 'MM-DD-YYYY',
            weekStart: 1,
            time: false
        }).on('change', function(e, date){
            self.props.onChange(date, e);
        }).val(this.props.value);

        // validation the date picker
        $('#'+this.props.unique).validate({
            rules: {
                'date': {
                    required: true
                }
            },
            highlight: function (input) {
                $(input).parents('.form-line').addClass('error');
            },
            unhighlight: function (input) {
                $(input).parents('.form-line').removeClass('error');
            },
            errorPlacement: function (error, element) {
                $(element).parents('.form-group').append(error);
            }
        });
    
    }

    componentDidUpdate(state, props) {
        if (this.state.value == '' || this.state.value == undefined) {
            this.state.isValidated = false;
        } else {
            this.state.isValidated = true;
        }
    }

    error_view = (mess, key) => {
        return (
            <label key={key} className="text-danger">{ mess }</label>
        );
    }

    onChanged (e) {
        e.preventDefault();
        this.setState({value: e.target.value});
        if (this.state.value == '') {
            this.setState({isValidated: false});
        } else {
            this.setState({isValidated: true});
        }
        this.props.onChange(e.target.value);
    }


	render() {

        let error_message = [];
        let validation = this.state.validationMessage;

        if (this.state.isValidated == false) {
            error_message.push(this.error_view(validation, "4"));
        } else {
            error_message.push(<label></label>);
        }

		return (
			<div id={this.props.unique} className="datepicker-container">
                <div id="picker" className="form-control btn">
                    <div className="flex-box">
                        <input type={this.state.type} className={this.props.unique + ' datepicker form-control'} placeholder={this.state.placeholder} onChange={this.props.onChange} data-dtp="dtp_iR8Yp" />
                        <i className="material-icons calendar-icon">perm_contact_calendar</i>
                    </div>
                </div>
            </div>
		);
	}

}


DatepickerCustom.propTypes = {
  // value: PropTypes.string,
  // isvalidated: PropTypes.bool,
  // validationMessage: PropTypes.string,
  // placeholder: PropTypes.string,
  // type: PropTypes.string,
  // onChange: PropTypes.function,
  // unique: PropTypes.string,

};


export default DatepickerCustom;
import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import * as actions from '../../store/actions/index';
import 'font-awesome/css/font-awesome.min.css';
import withReactContent from 'sweetalert2-react-content';
import history from "../../hoc/Config/history"
import Spinner from "../../components/UI/Spinner/Spinner";
import Swal from 'sweetalert2'
const MySwal = withReactContent(Swal)



class EmailConfirmPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isConfirmation: false,
            responseData: null,

        };

    }

    async componentDidMount() {
        const { key } = this.props.match.params;
        console.log('key', key);
        await this.props.confirmEmail(key);

        if (this.props.response) {

            MySwal.fire({
                icon: 'success',
                title: 'SÜPER!',
                text: 'Hesabınız doğrulandı.',

                confirmButtonText: 'Tamam',


            }).then(() => {
                this.props.resetState();
                this.backLogin();

            })

        } else {

            MySwal.fire({
                icon: 'error',
                title: 'Hay aksi',
                text: 'İşlem sırasında hata oluştu. Lütfen sistem yöneticisine bildiriniz',
                confirmButtonText: 'Tamam',

            }).then(() => {
                this.props.resetState();
                this.backLogin();
            })

        }
    }

 
    backLogin() {
        history.push('/auth/login');
    }


    render() {










        return (
            <>

            </>
        );
    }
}


const mapStateToProps = state => {
    return {
        loading: state.confirmEmail.loading,
        statusText: state.confirmEmail.statusText,
        response: state.confirmEmail.response,

    };
}
const mapDispatchToProps = dispatch => {
    return {
        resetState: () => dispatch(actions.confirmEmailAction.resetState()),
        confirmEmail: (key) => dispatch(actions.confirmEmailAction.confirmEmail(key)),
    };
}



export default connect(mapStateToProps, mapDispatchToProps)(EmailConfirmPage);





import React, { PureComponent } from 'react';

class EmailCheck extends Component {
    state = {}
    render() {
        return (
            <Container style={{ marginLeft: '30%', marginRight: '30%' }}>
                <Row>
                    <Col >
                        <Label >{this.props.statusText}</Label>
                    </Col>
                </Row>

            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        statusText: state.users.statusText,
        error: state.users.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        emailCheck: (email) => dispatch(actions.emailCheck(email)),
        cleanFlagUser: () => dispatch(actions.cleanFlagsUsers())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailCheck);
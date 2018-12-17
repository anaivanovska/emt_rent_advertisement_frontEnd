import React from 'react';
import ChangePasswordFrom from './ChangePasswordForm';
import NavMenu from "../../Menu/NavMenu";
import '../userComponentsStyles.scss'

const ChangeUserPassword = (props) => {
    return (
        <div>
            <NavMenu/>
            <ChangePasswordFrom  history={props.history} username={props.match.params.username} />
        </div>
    )
};

export default ChangeUserPassword;

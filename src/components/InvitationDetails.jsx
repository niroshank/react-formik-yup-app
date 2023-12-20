import { Form, Field, ErrorMessage } from "formik";
import { withSubForm } from "helpers/formik/withSubForm";
import * as Yup from "yup";
import React from "react";
import { useValues } from "helpers/formik/useValues";
import ErrorMessageWrapper from "./ErrorMessageWrapper";

export const SubSchema = Yup.object().shape({
	invitationMessage: Yup.string().required("Required"),
	location: Yup.string().required("Required"),
});

const InvitationDetails = ({ isDirty, name, errors, touched, ...props }) => {
	useValues(name, props);

	return (
		<>
			<div>
				<label>
					Invitation message:
					<Field name="invitationMessage" type="text" />
					<ErrorMessageWrapper
						isDirty={isDirty}
						errors={errors}
						touched={touched}
						fieldName="invitationMessage"
					/>
				</label>
			</div>
			<div>
				<label>
					Location:
					<Field name="location" type="text" />
					<ErrorMessageWrapper
						isDirty={isDirty}
						errors={errors}
						touched={touched}
						fieldName="location"
					/>
				</label>
			</div>
		</>
	);
};

export const InvitationSubForm = withSubForm(InvitationDetails, SubSchema);

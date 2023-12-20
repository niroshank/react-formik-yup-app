import { Form, Field, useFormikContext, ErrorMessage } from "formik";
import { withSubForm } from "helpers/formik/withSubForm";
import * as Yup from "yup";
import React from "react";
import { useValues } from "helpers/formik/useValues";
import ErrorMessageWrapper from "./ErrorMessageWrapper";

export const ColleagueSchema = Yup.object().shape({
	colleagueName: Yup.string().required("Required"),
});

const ColleagueField = ({ isDirty, name, errors, touched, ...props }) => {
	useValues(name, props);

	return (
		<>
			<div>
				<label>
					Colleague Name:
					<Field name="colleagueName" type="text" />
					<ErrorMessageWrapper
						isDirty={isDirty}
						errors={errors}
						touched={touched}
						fieldName="colleagueName"
					/>
				</label>
			</div>
		</>
	);
};

export const ColleagueSubForm = withSubForm(ColleagueField, ColleagueSchema);

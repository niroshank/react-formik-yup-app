import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import { withSubForm } from "helpers/formik/withSubForm";
import * as Yup from "yup";
import React from "react";
import { useValues } from "helpers/formik/useValues";
import FriendField from "./FriendField";

export const FriendListSchema = Yup.array().of(
	Yup.object().shape({
		name: Yup.string().required("Required"),
		email: Yup.string().email("Invalid email").required("Required"),
		relationship: Yup.string().required("Required"),
	})
);

const FriendList = ({ name, errors, touched, ...props }) => {
	useValues(name, props);

	return (
		<div>
			<FieldArray name="friends">
				{({ remove, push }) => (
                    
					<div>
                        {console.log("arr", props)}
						{props.values.map((friend, index) => (
							<FriendField key={index} index={index} remove={remove} />
						))}
						<button
							type="button"
							className="secondary"
							onClick={() => {
                                props.values.push({ name: "", email: "", relationship: "" })}
                            }
						>
							Add Friend
						</button>
					</div>
				)}
			</FieldArray>
		</div>
	);
};

export const FriendSubForm = withSubForm(FriendList, FriendListSchema);

// InviteFriends.js
import React from "react";
import ReactDOM from "react-dom";
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import FriendField, { FriendSchema } from "./FriendField";
import * as Yup from "yup";
import { SubSchema, InvitationSubForm } from "./InvitationDetails";

const schema = Yup.object().shape({
	invitationDetails: SubSchema,
    friends: Yup.array().of(FriendSchema)
});

const InviteFriends = () => {
	const initialValues = {
		invitationDetails: {
			invitationMessage: "",
			location: "",
		},
		friends: [
			{
				name: "",
				email: "",
				relationship: "",
                colleagueDetails: {
                    colleagueName: ""
                },
			},
		],
	};

	const handleSubmitForm = (values) => {
		debugger;
		console.log(values);
	};

	const InviteFriendForm = ({ handleSubmit, values, ...props }) => {
		return (
			<div>
				<Form>
					<div>
						<Field name="invitationDetails" component={InvitationSubForm} />
					</div>
					<FieldArray name="friends">
						{({ remove, push }) => (
							<div>
								{values.friends.map((friend, index) => (
									<FriendField key={index} index={index} remove={remove} />
								))}
								<button
									type="button"
									className="secondary"
									onClick={() =>
										push({ name: "", email: "", relationship: "" })
									}
								>
									Add Friend
								</button>
							</div>
						)}
					</FieldArray>
					<button type="submit" value="Submit">
						Save
					</button>
				</Form>
			</div>
		);
	};

	return (
		<Formik
			children={InviteFriendForm}
			onSubmit={handleSubmitForm}
			initialValues={initialValues}
			validationSchema={schema}
            validateOnMount
            enableReinitialize
		/>
	);
};

export default InviteFriends;

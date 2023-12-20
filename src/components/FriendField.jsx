// FriendField.js
import React from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import { ColleagueSchema, ColleagueSubForm } from "./ColleagueField";
import { useState } from "react";
import ErrorMessageWrapper from "./ErrorMessageWrapper";

export const FriendSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    relationship: Yup.string().required("Required"),
    colleagueDetails: Yup.object().when("relationship", {
      is: "colleague",
      then: () => ColleagueSchema,
      otherwise: () => Yup.mixed().notRequired(),
    }),
  });

const FriendField = ({ index, remove }) => {
	const [showColleagueDetails, setShowColleagueDetails] = useState(false);
    const { setFieldValue, errors, touched, dirty, setFieldError, setFieldTouched } = useFormikContext();

    console.log("roww", `friends.${index}.name`)

	return (
		<div className="row">
			<div className="col">
				<label htmlFor={`friends.${index}.name`}>Name</label>
				<Field
					name={`friends.${index}.name`}
					placeholder="Jane Doe"
					type="text"
				/>
				<ErrorMessage
					name={`friends.${index}.name`}
					component="div"
					className="text-red-400 text-xs"
				/>
			</div>

			<div className="col">
				<label htmlFor={`friends.${index}.email`}>Email</label>
				<Field
					name={`friends.${index}.email`}
					placeholder="jane@acme.com"
					type="email"
				/>
				<ErrorMessage
					name={`friends.${index}.email`}
					component="div"
					className="text-red-400 text-xs"
				/>
			</div>

			<div className="col">
				<label>
					<Field
						type="radio"
						name={`friends.${index}.relationship`}
						value="colleague"
						onChange={(e) => {
							setShowColleagueDetails(e.target.value === "colleague");
                            setFieldValue(`friends.${index}.relationship`, "colleague");
							setFieldValue(`friends.${index}.colleagueDetails`, {
                                colleagueName: ""
                            });
						}}
					/>
					Colleague
				</label>
				<label>
					<Field
						type="radio"
						name={`friends.${index}.relationship`}
						value="friend"
						onChange={(e) => {
							setShowColleagueDetails(e.target.value === "colleague");
							setFieldValue(`friends.${index}.relationship`, "friend");
                            setFieldValue(`friends.${index}.colleagueDetails`, null);
						}}
					/>
					Friend
				</label>
			</div>

			{showColleagueDetails && (
				<Field
					name={`friends.${index}.colleagueDetails`}
					component={ColleagueSubForm}
				/>
			)}

			<div className="col">
				<button
					type="button"
					className="secondary"
					onClick={() => remove(index)}
				>
					X
				</button>
			</div>
		</div>
	);
};

export default FriendField;

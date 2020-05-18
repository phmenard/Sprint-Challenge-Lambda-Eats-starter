import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import '../css/index.css';
import {Redirect} from 'react-router-dom';

const formSchema = yup.object().shape({
    name: yup
        .string().required("Name is a required field")
        .test('len', 'Must be at least two(2) characters', val => val.length > 2),
    //.matches(/^(!?" "$)/, "Please Enter Your Full Name"),
    size: yup
        .string().required("Coose a size"),
        

    sauce: yup
        .string().required("Coose a size"),

    toppings: yup
        .string().required("Choose atleast one topping")
        .test('len', 'Choose a Topping', toppings => toppings.length > 0),

    substitute: yup
        .boolean().notRequired(),

    specialInstructions : yup
        .string().notRequired()



});
const BuildPizzaForm = (props) => {
    // state managment
    const [formState, setFormState] = useState({
        name: "",
        size: 'small',
        sauce: "Original",
        toppings: [],
        substitute: "",
        specialInstructions: "",
        howMany: 1
        
    });

    // error state
    const [errorState, setErrorState] = useState({
        name: "",
        size: "",
        sauce: "",
        toppings: "",
        substitute: "",
        specialInstructions: "",
        howMany: 0
    });

    // save our posted data
    const [pizza, setPizza] = useState([]);

    // validate our form
    const validate = e => {
        let value =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;
        yup
            .reach(formSchema, e.target.name)
            .validate(value)
            .then(valid => {
                setErrorState({
                    ...errorState,
                    [e.target.name]: ""
                });
            })
            .catch(err => {
                setErrorState({
                    ...errorState,
                    [e.target.name]: err.errors[0]
                });
            });

        console.log(formState);
    };

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            //setButtonDisabled(!valid); // enable submit button if form is valid
        });
    }, [formState]);

    // onChange function
    const inputChange = e => {
        e.persist();
        validate(e);
        let value = e.target.value;
        if (e.target.type === "checkbox" && e.target.name !== "substitute") {
            if (e.target.checked) {
                formState.toppings.push(e.target.value);
            } else {
                const index = formState.toppings.indexOf(e.target.value);
                if (index > -1) {
                    formState.toppings.splice(index, 1);
                }
            }

            console.log(e.target.checked);

        } else {
            value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
            setFormState({ ...formState, [e.target.name]: value });
        }


        console.log(e.target.value);
    };

    // submit the form and grab the results
    const formSubmit = e => {
        e.preventDefault();
        console.log("form submitted!");
        axios
            .post("https://reqres.in/api/users", formState)
            .then(res => {
                //setUsers(res.data);
                console.log("success", res);
                
                // reset the form if all is good
                setFormState({
                    name: "",
                    size: "",
                    sauce: "Original",
                    toppings: [],
                    substitute: "",
                    specialInstructions: "",
                    howMany: 1
                });

                return  <Redirect  to="/" />
            })
            .catch(err => console.log(err.response));

            
    };



    return (
        <form className="pizzaForm" onSubmit={formSubmit}>
            <h1>Build Your Own Pizza</h1>
            <section>
                <div className="sectionHeader">

                    <h2>Full Name</h2>
                    <div className="name">
                        <input
                            type="text"
                            id="name"
                            name="name"


                            value={formState.name}
                            onChange={inputChange}
                        />{errorState.name.length > 2 ? (
                            <p className="error">{errorState.name}</p>
                        ) : null}


                    </div>

                </div>


            </section>
            <section>
                <div className="sectionHeader">
                    <h2>Choice of Size</h2>
                Requiered
                </div>

                <select
                    name="size"
                    id="size"
                    value={formState.size}
                    placeholder="size"
                    onChange={inputChange}
                >
                    <option value="Small">Small</option>
                    <option value="Medium">Medium </option>
                    <option value="Large">Large</option>
                    <option value="Party Sizeng">Party Size</option>
                </select>
            </section>



            <section>
                <div className="sectionHeader">

                    <h2>Choice of Sauce</h2>
                Requiered
                </div>

                <div className="specialSauce">
                    <div className="sauceOptions">
                        <input onChange={inputChange} type="radio" id="Original" name="sauce" value="Original" defaultChecked="checked" />Original<br />
                        <input onChange={inputChange} type="radio" id="Criginal Red" name="sauce" value="Criginal Red" />Criginal Red<br />
                        <input onChange={inputChange} type="radio" id="Garlic Ranch" name="sauce" value="Garlic Ranch" />Garlic Ranch<br />
                        <input onChange={inputChange} type="radio" id="BBQ Sauce" name="sauce" value="BBQ Sauce" />BBQ Sauce<br />
                        <input onChange={inputChange} type="radio" id="Spinach Alfredo" name="sauce" value="Spinach Alfredo" />Spinach Alfredo<br />
                    </div>
                </div>
            </section>




            <section>
                <div className="sectionHeader">
                    <h2>Add Toppings</h2>
                    Choose up to 10
                    {errorState.toppings.length > 0 ? (
                            <p className="error">{errorState.toppings}</p>
                        ) : null}
                </div>

                <div className="availableToppings">
                    <div className="topping">
                        <input
                            type="checkbox"
                            id="Pepperoni"
                            name="toppings"
                            value="Pepperoni"
                            //checked="Pepperoni"
                            onChange={inputChange}

                        />
                Pepperoni


                </div>
                    <div className="topping">
                        <input
                            type="checkbox"
                            id="Sausage"
                            name="toppings"
                            value="Sausage"
                            //checked={formState.toppings}
                            onChange={inputChange}
                        />
                Sausage
                </div>

                    <div className="topping">
                        <input
                            type="checkbox"
                            id="Canadian Bacon"
                            name="toppings"
                            value="Canadian Bacon"
                        //checked={formState.terms}
                        onChange={inputChange}
                        />
                Canadian Bacon
                </div>

                    <div className="topping">
                        <input
                            type="checkbox"
                            id="Spicey Italin Sausage"
                            name="toppings"
                            value="Spicey Italin Sausage"
                        //checked={formState.terms}
                        onChange={inputChange}
                        />
                Spicey Italin Sausage
                </div>

                    <div className="topping">
                        <input
                            type="checkbox"
                            id="Grilled Chicken"
                            name="toppings"
                            value="Grilled Chicken"
                        //checked={formState.terms}
                        onChange={inputChange}
                        />
                Grilled Chicken
                </div>

                    <div className="topping">
                        <input
                            type="checkbox"
                            id="Onions"
                            name="toppings"
                            value="Onions"
                        //checked={formState.terms}
                        onChange={inputChange}
                        />
                Onions
                </div>

                    <div className="topping">
                        <input
                            type="checkbox"
                            id="Green Pepper"
                            name="toppings"
                            value="Green Pepper"
                        //checked={formState.terms}
                        onChange={inputChange}
                        />
                Green Pepper
                </div>

                    <div className="topping">
                        <input
                            type="checkbox"
                            id="Diced Tomatos"
                            name="toppings"
                            value="Diced Tomatos"
                        //checked={formState.terms}
                        onChange={inputChange}
                        />
                Diced Tomatos
                </div>

                    <div className="topping">
                        <input
                            type="checkbox"
                            id="Black Olives"
                            name="toppings"
                            value="Black Olives"
                        //checked={formState.terms}
                        onChange={inputChange}
                        />
                Black Olives
                </div>

                    <div className="topping">
                        <input
                            type="checkbox"
                            id="Roasted Garlic"
                            name="toppings"
                            value="Roasted Garlic"
                        //checked={formState.terms}
                        onChange={inputChange}
                        />
                Roasted Garlic
                </div>

                    <div className="topping">
                        <input
                            type="checkbox"
                            id="Artichoke Hearts"
                            name="toppings"
                            value="Artichoke Hearts"
                        //checked={formState.terms}
                        onChange={inputChange}
                        />
                Artichoke Hearts
                </div>

                    <div className="topping">
                        <input
                            type="checkbox"
                            id="Three Cheese"
                            name="toppings"
                            value="Three Cheese"
                        //checked={formState.terms}
                        onChange={inputChange}
                        />
                Three Cheese
                </div>

                    <div className="topping">
                        <input
                            type="checkbox"
                            id="Pineapple"
                            name="toppings"
                            value="Pineapple"
                        //checked={formState.terms}
                        onChange={inputChange}
                        />
                Pineapple
                </div>

                    <div className="topping">
                        <input
                            type="checkbox"
                            id="Extra Cheese"
                            name="toppings"
                            value="Extra Cheese"
                        //checked={formState.terms}
                        onChange={inputChange}
                        />
                Extra Cheese
                </div>

                   

                </div>

            </section>

            <section>
                <div className="sectionHeader">

                    <h2>Choice of Substitute</h2>
                Choose up to 1
                </div>

                <div className="substitute">
                    <input
                        type="checkbox"
                        id="substitute"
                        name="substitute"
                        value="Gluten Free Crust"
                    //checked={formState.terms}
                    onChange={inputChange}
                    />
                Gluten Free Crust (+ $1.00)
                </div>
            </section>

            <section className="specialInstructons">
                <div className="sectionHeader">

                    <h2>Special Instructions</h2>

                </div>

                <input
                    type="text"
                    id="terms"
                    name="specialInstructions"
                    placeholder="Anything else you want to add?"
                //checked={formState.terms}
                onChange={inputChange}
                />

            </section>

            <section>
                <div className="sectionHeader">

                    <h2>Place your Order</h2>
                    <div className="placeOrder">
                        <input
                            type="text"
                            id="terms"
                            name="howMany"
                            placeholder="How many would you like?"
                        value={formState.howMany}
                        onChange={inputChange}
                        />

                        <button>
                            Place Order
                        </button>

                    </div>

                </div>


            </section>

        </form>

    );

}

export default BuildPizzaForm;



import React, {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "../../../context/AuthContext.jsx";

const CategoriesOverview = ({accountId}) => {

    const [categories, setCategories] = useState([]);
    const {token} = useAuth();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(
                    `https://budgeter-api.azurewebsites.net/api/user/account/${accountId}/categories`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setCategories(response.data.items);
            } catch (error) {
                console.error("Failed to fetch account details:", error);
            }
        };

        fetchCategories();
    }, [accountId, token]);

    console.log("data:", categories);

    return (<div className="categories-overview-section">
        <h3 className="middle-section-header">Most Popular Categories</h3>
        {categories.map((category) => (
            `${category.id}: ${category.name}`
        ))}
    </div>);
}

export default CategoriesOverview;
import {
    BedrockRuntimeClient,
    InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";
// const db = require('@/database');
const Sequelize = require('sequelize');
const db = require('@/database/models');

// Initialize Bedrock client using AWS SDK v3
const client = new BedrockRuntimeClient({
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.BEDROCK_ACCESS_KEY_ID,
        secretAccessKey: process.env.BEDROCK_SECRET_ACCESS_KEY
    }
});



// Database schema context to control accessible tables and columns
const databaseSchemaContext = {
    tables: {
        account_type: {
            columns: ["name", "created_by", "created_date", "last_updated_by", "last_updated_date"],
            restricted_columns: []
        },
        approval_hierarchy: {
            columns: ["type", "created_by", "created_date", "last_updated_by", "last_updated_date"],
            restricted_columns: []
        },
        approval_hierarchy_level_detail: {
            columns: ["approval_hierarchy_id", "level", "user_id", "created_by", "created_date", "last_updated_by", "last_updated_date"],
            restricted_columns: ["user_id"]
        },
        assigned_task: {
            columns: ["contract_id", "task_id", "user_id", "labor_category_id", "contract_rates_id", "payroll_id", "task_start_date", "task_end_date", "hours", "status", "remarks", "created_by", "created_date", "last_updated_by", "last_updated_date"],
            restricted_columns: ["user_id", "remarks"]
        },
        chart_of_accounts: {
            columns: ["account_number", "account_name", "parent_id", "account_type_id", "description", "bank_no", "opening_balance", "open_balance_date", "tax_line_id", "currency_ref", "status", "created_by", "created_date", "last_updated_by", "last_updated_date"],
            restricted_columns: ["bank_no", "opening_balance"]
        },
        class: {
            columns: ["name", "created_by", "created_date", "last_updated_by", "last_updated_date"],
            restricted_columns: []
        },
        company_rates: {
            columns: ["from_date", "to_date", "fringe", "overhead", "ga", "created_by", "created_date", "last_updated_by", "last_updated_date"],
            restricted_columns: []
        },
        company: {
            columns: ["name", "uid", "address_1", "address_2", "zipcode", "city", "state", "country", "phone_number", "email", "logo", "completed_step", "setup_completed", "created_by", "created_date", "last_updated_by", "last_updated_date"],
            restricted_columns: ["address_1", "address_2", "phone_number", "email"]
        },
        contracts: {
            columns: ["customer_id", "name", "type", "no", "start_date", "end_date", "value", "labor", "odc", "reserve", "fees", "status", "class_id", "chart_of_accounts_id", "description", "contract_types_id", "created_by", "created_date", "last_updated_by", "last_updated_date"],
            restricted_columns: []
        },
        contract_rates: {
            columns: ["contract_id", "from_date", "to_date", "rate_type", "budgeted_value", "labor", "odc", "reserve", "fringe", "overhead", "ga", "created_by", "created_date", "last_updated_by", "last_updated_date"],
            restricted_columns: []
        },
        customers: {
            columns: ["name", "customer_no", "email", "address_1", "address_2", "zipcode", "city", "state", "country", "phone", "website", "fax", "status", "is_prospect", "class_id", "description", "created_by", "created_date", "last_updated_by", "last_updated_date"],
            restricted_columns: ["email", "address_1", "address_2", "phone", "fax"]
        },
        customer_contact_email: {
            columns: ["customer_id", "customer_contact_id", "email_type", "email", "created_by", "created_date", "last_updated_by", "last_updated_date"],
            restricted_columns: ["email"]
        },
        customer_contact_notes: {
            columns: ["customer_id", "customer_contact_id", "user_id", "notes", "date", "follow_up_date", "follow_up_method", "type", "created_by", "created_date", "last_updated_by", "last_updated_date"],
            restricted_columns: ["notes"]
        },
        customer_contact_phone: {
            columns: ["customer_id", "customer_contact_id", "type", "extension", "number", "created_by", "created_date", "last_updated_by", "last_updated_date"],
            restricted_columns: ["number"]
        },
        customer_contact_send_email: {
            columns: ["to", "subject", "content", "created_by", "created_date", "last_updated_by", "last_updated_date"],
            restricted_columns: ["content"]
        },
        customer_contacts: {
            columns: ["customer_id", "suffix", "first_name", "last_name", "department", "job_title", "address_1", "address_2", "zipcode", "city", "state", "country", "description", "image_url", "created_by", "created_date", "last_updated_by", "last_updated_date"],
            restricted_columns: ["address_1", "address_2", "zipcode", "image_url"]
        },
        customer_notes: {
            columns: ["customer_id", "user_id", "notes", "date", "follow_up_date", "follow_up_method", "type", "created_by", "created_date", "last_updated_by", "last_updated_date"],
            restricted_columns: ["notes"]
        },
        tasks: {
            columns: ["task_id", "name", "contract_id", "start_date", "end_date", "status", "created_by", "created_date", "last_updated_by", "last_updated_date"],
            restricted_columns: []
        },
        users: {
            columns: ["first_name", "middle_name", "last_name", "official_email", "personal_email", "phone", "address_1", "address_2", "dob", "ssn", "emergency_contact", "photo_url", "status", "created_by", "created_date", "last_updated_by", "last_updated_date"],
            restricted_columns: ["personal_email", "phone", "address_1", "address_2", "dob", "ssn", "emergency_contact"]
        },
        labor_category: {
            columns: ["labor_category_id", "name", "budget", "created_by", "created_date", "last_updated_by", "last_updated_date"],
            restricted_columns: []
        },
        assigned_task_documents: {
            columns: ["document_id", "assigned_task_id", "name", "upload_url", "status", "created_by", "created_date", "last_updated_by", "last_updated_date"],
            restricted_columns: []
        },
        payroll_item: {
            columns: ["payroll_id", "name", "value", "status", "created_by", "created_date", "last_updated_by", "last_updated_date"],
            restricted_columns: []
        },
        departments: {
            columns: ["name", "parent_department_id", "manager_id", "hr_manager_id", "address_1", "address_2", "zipcode", "city", "state", "country", "phone", "email", "location_id", "status", "created_by", "created_date", "last_updated_by", "last_updated_date"],
            restricted_columns: ["address_1", "address_2", "zipcode", "phone", "email"]
        },
        employee_leaves: {
            columns: ["leave_type_id", "user_id", "start_date", "applicable_from_date", "accural_rate", "frequency", "balance", "status", "created_by", "created_date", "last_updated_by", "last_updated_date"],
            restricted_columns: ["user_id"]
        },
        events: {
            columns: ["title", "description", "start_date", "end_date", "location", "event_type", "is_all_day", "is_recurring", "recurrence_rule", "organizer", "attendees", "priority", "notes", "status", "created_by", "created_date", "last_updated_by", "last_updated_date"],
            restricted_columns: ["organizer", "attendees"]
        },
        expense_approvals: {
            columns: ["expense_id", "user_id", "approver_id", "level", "action_date", "reason", "status", "created_by", "created_date", "last_updated_by", "last_updated_date"],
            restricted_columns: ["user_id", "approver_id"]
        },
        expense_category: {
            columns: ["name", "status", "created_by", "created_date", "last_updated_by", "last_updated_date"],
            restricted_columns: []
        },
        expense_details: {
            columns: ["expense_id", "expense_item_id", "amount", "expense_category_id", "date", "charge_to_task_id", "task_id", "route_to", "reimbursable", "description", "invoice_id", "status", "created_by", "created_date", "last_updated_by", "last_updated_date"],
            restricted_columns: []
        },
        expense_item: {
            columns: ["name", "status", "created_by", "created_date", "last_updated_by", "last_updated_date"],
            restricted_columns: []
        },
        expenses: {
            columns: ["user_id", "date", "status", "payperiod", "payperiod_year", "submitted_date", "created_by", "created_date", "last_updated_by", "last_updated_date"],
            restricted_columns: []
        },
        holidays: {
            columns: [
                "occasion", "date", "week_of_month", "day_of_week", "month", "location_id",
                "is_recurring", "recurrence_pattern_year", "base_date", "recurrence_end_type",
                "number_of_occurrences", "end_by_date", "parent_id", "created_by",
                "created_date", "last_updated_by", "last_updated_date"
            ],
            restricted_columns: []
        },
        invoice: {
            columns: [
                "customer_id", "billing_start_date", "billing_end_date", "invoice_type",
                "invoice_creation_date", "invoice_due_date", "invoice_no", "template_id",
                "total", "amount_paid", "status", "show_contract", "show_labor",
                "show_task", "show_employee", "notes", "created_by", "created_date",
                "last_updated_by", "last_updated_date"
            ],
            restricted_columns: ["total", "amount_paid", "notes"]
        },
        labor_category_rates: {
            columns: [
                "labor_category_id", "from_date", "to_date", "rate", "hours",
                "created_by", "created_date", "last_updated_by", "last_updated_date"
            ],
            restricted_columns: ["rate", "hours"]
        },
        labor_category: {
            columns: [
                "contract_id", "name", "budget",
                "created_by", "created_date", "last_updated_by", "last_updated_date"
            ],
            restricted_columns: []
        },
        leave_approvals: {
            columns: [
                "leave_id", "user_id", "approver_id", "level", "action_date",
                "reason", "status", "payperiod", "payperiod_year",
                "created_by", "created_date", "last_updated_by", "last_updated_date"
            ],
            restricted_columns: []
        },
        leave_types: {
            columns: [
                "name", "accural_rate", "carry_over_limit", "frequency", "payroll",
                "class", "default_balance", "pay_balance", "accure_excess_hours",
                "explanation_required", "available_to_employee", "billable", "status",
                "created_by", "created_date", "last_updated_by", "last_updated_date"
            ],
            restricted_columns: []
        },
        leaves: {
            columns: [
                "user_id", "leave_type_id", "reason", "start_date", "start_time",
                "end_date", "end_time", "leave_hours", "full_day", "status",
                "submitted_date", "created_by", "created_date", "last_updated_by",
                "last_updated_date"
            ],
            restricted_columns: []
        },
        locations: {
            columns: [
                "name", "created_by", "created_date", "last_updated_by", "last_updated_date"
            ],
            restricted_columns: []
        },
        customer_notes: {
            columns: [
                "customer_id", "description", "public", "status", "created_by", "created_date", "last_updated_by", "last_updated_date"
            ],
            restricted_columns: ["description"] // assuming "description" could contain sensitive information
        },
        payperiod: {
            columns: [
                "number", "start_date", "end_date", "year", "created_by", "created_date", "last_updated_by", "last_updated_date"
            ],
            restricted_columns: [] // no restricted columns assumed
        },
        payroll_item: {
            columns: [
                "name", "value", "created_by", "created_date", "last_updated_by", "last_updated_date"
            ],
            restricted_columns: [] // no restricted columns assumed
        },
        permissions: {
            columns: [
                "name", "key", "description", "feature", "created_by", "created_date", "last_updated_by", "last_updated_date"
            ],
            restricted_columns: [] // no restricted columns assumed
        },
        positions: {
            columns: [
                "name", "created_by", "created_date", "last_updated_by", "last_updated_date"
            ],
            restricted_columns: [] // no restricted columns assumed
        },
        purchase_order_approvals: {
            columns: [
                "purchase_order_id", "user_id", "approver_id", "level", "action_date",
                "reason", "status", "active", "created_by", "created_date",
                "last_updated_by", "last_updated_date"
            ],
            restricted_columns: [] // no restricted columns assumed
        },
        purchase_order_items: {
            columns: [
                "item_number", "labor_category", "description", "name", "quantity",
                "cost", "hours", "rate", "total", "purchase_order_id",
                "created_by", "created_date", "last_updated_by", "last_updated_date"
            ],
            restricted_columns: [] // no restricted columns assumed
        },
        purchase_order: {
            columns: [
                "name", "title", "term_id", "type", "vendor_id",
                "order_no", "date", "delivery_date", "requester",
                "active", "status", "created_by", "created_date",
                "last_updated_by", "last_updated_date"
            ],
            restricted_columns: [] // assuming no sensitive data to restrict
        },
        role_permissions: {
            columns: ["role_id", "permission_id", "created_by", "created_date", "last_updated_by", "last_updated_date"],
            restricted_columns: [] // assuming no sensitive data to restrict
        },
        roles: {
            columns: ["name", "created_by", "created_date", "last_updated_by", "last_updated_date"],
            restricted_columns: [] // assuming no sensitive data to restrict
        },
        signature_history: {
            columns: ["entity_id", "user_id", "type", "description", "status", "action_date", "created_by", "created_date", "last_updated_by", "last_updated_date"],
            restricted_columns: []
        },
        tasks: {
            columns: [
                "name", "contract_id", "no", "budgeted_hours", "start_date", "end_date", "billable",
                "moniter_percentage_complete", "locations", "parent_id", "chart_of_accounts_id", "status",
                "disabled_by", "budget_amount", "class_id", "predecessor", "description", "enable_status",
                "is_status_required", "created_by", "created_date", "last_updated_by", "last_updated_date"
            ],
            restricted_columns: []
        },
        term: {
            columns: [
                "name", "public", "created_by", "created_date", "last_updated_by", "last_updated_date"
            ],
            restricted_columns: []
        },
        timesheet_approvals: {
            columns: [
                "timesheet_id", "user_id", "approver_id", "payperiod", "payperiod_year", "level",
                "action_date", "reason", "status", "created_by", "created_date", "last_updated_by", "last_updated_date"
            ],
            restricted_columns: []
        },
        timesheet_details: {
            columns: [
                "assigned_task_id", "timesheet_id", "task_id", "task_comments", "hours", "completed",
                "is_leave", "date", "start_time", "end_time", "reason", "user_id", "payperiod",
                "payperiod_year", "deligate_employee", "invoice_id", "created_by", "created_date",
                "last_updated_by", "last_updated_date"
            ],
            restricted_columns: ["reason", "user_id", "deligate_employee"]
        },
        timesheet: {
            columns: [
                "payperiod", "payperiod_year", "user_id", "status", "submitted_date",
                "created_by", "created_date", "last_updated_by", "last_updated_date"
            ],
            restricted_columns: ["user_id"]
        },
        user_contracts: {
            columns: [
                "contract_id", "user_id",
                "created_by", "created_date", "last_updated_by", "last_updated_date"
            ],
            restricted_columns: ["user_id"]
        },
        user_permissions: {
            columns: [
                "user_id", "permission_id",
                "created_by", "created_date", "last_updated_by", "last_updated_date"
            ],
            restricted_columns: ["user_id"]
        },
        user_preferences: {
            columns: [
                "key", "value", "user_id",
                "created_by", "created_date", "last_updated_by", "last_updated_date"
            ],
            restricted_columns: ["user_id"]
        },
        user_remarks: {
            columns: [
                "user_id", "feedback_type", "feedback_text",
                "provided_by", "rating", "private",
                "created_by", "created_date", "last_updated_by", "last_updated_date"
            ],
            restricted_columns: ["user_id", "provided_by", "feedback_text", "rating"]
        },
        user_roles: {
            columns: [
                "role_id", "user_id",
                "created_by", "created_date", "last_updated_by", "last_updated_date"
            ],
            restricted_columns: ["user_id", "role_id"]
        },
        user_type: {
            columns: [
                "name",
                "created_by", "created_date", "last_updated_by", "last_updated_date"
            ],
            restricted_columns: []
        },
        users: {
            columns: [
                "id", "first_name", "middle_name", "last_name", "hire_date", "relieving_date", "retirement_date", "user_no",
                "hidden_user", "official_email", "office_phone", "next_evaluation_date", "pay_effective_date",
                "annual_salary", "hourly_rate", "dob", "personal_phone", "mobile", "additional_phone", "address_1",
                "address_2", "zipcode", "city", "state", "country", "photo_url", "user_type_id", "reporting_manager_id",
                "position_id", "department_id", "pay_type", "status", "profile_image", "location_id", "created_by",
                "created_date", "last_updated_by", "last_updated_date"
            ],
            restricted_columns: [
                "ssn", "password", "personal_email", "alternate_email", "emergency_number", "emergency_name",
                "emergency_relation", "emergency_email", "triggered_password_reset"
            ]
        },
        vendors: {
            columns: [
                "name", "description", "vendor_no", "email", "address_1", "address_2", "zipcode", "city",
                "state", "country", "phone", "website", "fax", "status", "created_by", "created_date",
                "last_updated_by", "last_updated_date"
            ],
            restricted_columns: []
        },
        working_hours: {
            columns: [
                "sequence_no", "day", "type", "start_time", "end_time", "created_by",
                "created_date", "last_updated_by", "last_updated_date"
            ],
            restricted_columns: []
        },
        write_check: {
            columns: [
                "from_account", "to_account", "payee", "check_no", "date", "amount", "address",
                "memo", "status", "created_by", "created_date", "last_updated_by", "last_updated_date"
            ],
            restricted_columns: ["amount"]
        }
    }
};


/**
 * Generates an appropriate prompt based on the natural query type.
 */
async function processQuery(naturalQuery, schema, user_id) {
    const isDataQuery = /(number of|count of|list of|users|contracts|roles|permissions|status|hours|tasks|timesheet|expense)/i.test(naturalQuery);

    const sqlPrompt = `Generate an optimized SQL query for the schema "${schema}" based on the XPDOFFICE domain and the specified request.
g
    - **Important Note**: 
      Only use columns explicitly listed under "columns" for each table, and exclude any columns under "restricted_columns".vbvbnvb Respect column permissions as defined in the schema.
vbnvnbnvbvnbbcbhfn ngjcvccvcvvccvvc
    - **Expense and Expense Details**:
        - For queries about expenses, use data from **expenses** and **expense_details** tables.
        - The **expenses** table has an identifier 'id', while **expense_details** links to it via 'expense_id'.
        - When joining **expenses** and **expense_details**, use 'e.id = ed.expense_id'.
        - For **expense_category** and **expense_item** joins, use 'ec.id = ed.expense_category_id' and 'ei.id = ed.expense_item_id' respectively.
        - Filter by 'user_id = ${user_id} ' for user-specific queries.

    - **Status Filtering**:
      Apply the following status values for filtering if specified: 
        - SUBMITTED, PENDING_APPROVAL, APPROVED, NOT_SUBMITTED
      When a status filter like "submitted expenses" is mentioned, include these status values in the WHERE clause as specified in the query.

    - **Conditions**:
        - Apply filtering conditions only if explicitly requested by the user query.
        - Avoid adding 'IS NOT NULL' conditions unless specified in the request.

    - **Query Types**:
        - For expense totals, aggregate 'SUM(amount)' from **expense_details** to calculate total expenses within a period or category.
        - For breakdowns by category, group results by **expense_category_id** and **expense_item_id**.
        - Use date range filters if specified, such as for expenses within a specific month or quarter.

    - **Example Queries**:
        - For "total expenses this month," join **expenses** and **expense_details**, filter by 'user_id = ${user_id}' and date range, and sum the expense amounts.
        - For "expense breakdown by category," join **expense_details** with **expense_category** and **expense_item** and group by **expense_category_id** and **expense_item_id**.
    
    - **Request**:
        Based on the above structure and instructions, create the SQL query for:
        "${naturalQuery}"
    
    **Output Format**:
    Respond only with the SQL query without additional comments. Ensure the query syntax uses exact column names and excludes restricted columns.`;

    const casualPrompt = `Respond conversationally to the following question without generating SQL code:
        "${naturalQuery}"`;

    const prompt = isDataQuery ? sqlPrompt : casualPrompt;

    return await getResponseFromBedrock(prompt);
}






/**
 * Function to send request to AWS Bedrock
 */
async function getResponseFromBedrock(query) {
    console.log('-----------');
    // console.log(query);
    console.log('-----------');

    const params = {
        modelId: 'us.meta.llama3-2-1b-instruct-v1:0',
        contentType: 'application/json',
        accept: 'application/json',
        body: JSON.stringify({
            prompt: [[
                { role: "user", content: "Hi" }
            ]],
        })
    };

    try {
        const modelId = "meta.llama3-70b-instruct-v1:0";
        // Define the user message to send.
        const userMessage = "Describe the purpose of a 'hello world' program in one sentence.";

        // Embed the message in Llama 3's prompt format.
        const prompt = `
                <| begin_of_text |><| start_header_id |> user <| end_header_id |>
                ${query}
        <| eot_id |>
        <| start_header_id |> assistant <| end_header_id |>
        `;

        // Format the request payload using the model's native structure.
        const request = {
            prompt,
            // Optional inference parameters:
            max_gen_len: 512,     // Maximum length of the generated response
            temperature: 0.5,     // Controls the randomness of the response
            top_p: 0.9,           // Controls diversity of the response
        };

        const command = new InvokeModelCommand({
            contentType: "application/json",
            body: JSON.stringify(request),
            modelId,
        });
        const response = await client.send(command);

        const bodyString = new TextDecoder('utf-8').decode(response.body);
        console.log(bodyString)
        const parsedResponse = JSON.parse(bodyString);

        // Adjust this based on the response format for `meta.llama3 - 2 - 1b - instruct - v1: 0`
        return parsedResponse.generation || '';
    } catch (error) {
        console.error('Error in Bedrock:', error);
        throw new Error('Error processing the natural language query.');
    }
}




/**
 * Function to validate and execute SQL query
 */
async function executeSQLQuery(sqlQuery, schema) {
    try {
        const isSQLQuery = /(SELECT|INSERT|UPDATE|DELETE)\s+/i.test(sqlQuery);
        if (!isSQLQuery) return { response: sqlQuery };

        const queryMatch = sqlQuery.match(/SELECT\s+[\s\S]+?(;|$)/i);
        if (!queryMatch) throw new Error("Invalid SQL format in the response");

        const cleanSQLQuery = queryMatch[0].trim();
        // validateSQLQuery(cleanSQLQuery);

        const result = await db.sequelize.query(cleanSQLQuery, {
            raw: true,
            type: Sequelize.QueryTypes.SELECT,
            searchPath: schema
        });
        return result;
    } catch (error) {
        console.error('Sequelize Query Error:', error);
        throw new Error('Error executing the SQL query.');
    }
}

/**
 * Validates SQL query against schema context
 */
function validateSQLQuery(sqlQuery) {
    const allowedTables = Object.keys(databaseSchemaContext.tables);
    const queryTables = sqlQuery.match(/FROM\s+(\w+)/gi)?.map(match => match.split(" ")[1]) || [];
    const queryColumnsString = sqlQuery.match(/SELECT\s+([\s\S]+?)\s+FROM/i)?.[1] || "";
    const queryColumns = queryColumnsString.split(",").map(col => col.trim());

    for (const table of queryTables) {
        if (!allowedTables.includes(table)) {
            throw new Error(`Query references a restricted table: ${table} `);
        }

        const allowedColumns = databaseSchemaContext.tables[table].columns;
        const restrictedColumns = databaseSchemaContext.tables[table].restricted_columns;

        for (const column of queryColumns) {
            if (column.includes('(') || column === '*') continue;
            if (restrictedColumns.includes(column)) {
                throw new Error(`Query references a restricted column: ${column} `);
            }
            if (!allowedColumns.includes(column)) {
                throw new Error(`Query references an invalid column: ${column} in ${table} `);
            }
        }
    }
    return sqlQuery;
}

module.exports = {
    processQuery,
    executeSQLQuery
};
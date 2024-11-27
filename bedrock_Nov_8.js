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


async function processQuery(naturalQuery, schema, user_id) {
    const dataType = identifyDataType(naturalQuery);

    if (dataType === 'xpdoffice') {
        return fetchXpdofficeFeatures();
    }

    const prompt = generatePromptForDataType(dataType, naturalQuery, schema, user_id);

    return await getResponseFromBedrock(prompt);
}

function identifyDataType(query) {
    // Detect user-related queries
    if (/users|user list|active users/i.test(query)) {
        return 'users';

        // Detect expense-related queries
    } else if (/expense|expense details|expense report|total amount|total expense|expense category|expense item|expense by task|expense by period|approved expenses|submitted expenses|pending expenses|not submitted/i.test(query)) {
        return 'expenses';

        // Detect timesheet-related queries
    } else if (/timesheet|logged hours|task hours|task list|work hours/i.test(query)) {
        return 'timesheets';

        // Detect XPDOFFICE information or overview queries
    } else if (/xpdoffice|what is the system|system features|system overview/i.test(query)) {
        return 'xpdoffice';
    }

    // Default to general if no specific category is matched
    return 'general';
}


function generatePromptForDataType(dataType, query, schema, user_id) {
    const baseContext = `
    The schema "${schema}" includes tables and columns with specified restrictions.
    Use columns explicitly listed under "columns" for each table, and exclude any columns listed under "restricted_columns".`;

    let specificPrompt = '';
    console.log(dataType)
    switch (dataType) {
        case 'users':
            const userTable = databaseSchemaContext.tables.users;
            specificPrompt = `
            **User Data Retrieval**:
            - Use the **users** table for queries about user information.
            - Allowed columns: ${userTable.columns.join(', ')}.
            - Apply status filters (ACTIVE, INACTIVE, DISABLED) if specified.
            - For user-specific requests, include 'user_id = ${user_id}' to filter records.`;
            break;

        case 'expenses':
            const expenseTables = {
                expenses: databaseSchemaContext.tables.expenses,
                expenseDetails: databaseSchemaContext.tables.expense_details,
                expenseCategory: databaseSchemaContext.tables.expense_category,
                expenseItem: databaseSchemaContext.tables.expense_item,
                tasks: databaseSchemaContext.tables.tasks
            };

            specificPrompt = `
                    **Expense Data Retrieval**:
                    - Allowed columns for expenses: ${expenseTables.expenses.columns.join(', ')}.
                    - Allowed columns for expense details: ${expenseTables.expenseDetails.columns.join(', ')}.
                    - Allowed columns for expense categories: ${expenseTables.expenseCategory.columns.join(', ')}.
                    - Allowed columns for expense items: ${expenseTables.expenseItem.columns.join(', ')}.
                    - To calculate total costs or retrieve specific expense details, use the following guidance:
                        - Use **SUM(ed.amount)** for total expense.
                        - Use **expenses** (e), **expense_details** (ed), **expense_category** (ec), **expense_item** (ei), and **tasks** (t) tables for itemized expense data.
                        - Join **expense_details** (ed) with:
                            - **expense_category** (ec) on 'ed.expense_category_id = ec.id' to retrieve the category name,
                            - **expense_item** (ei) on 'ed.expense_item_id = ei.id' for item names,
                            - **tasks** (t) on 'ed.task_id = t.id' to retrieve task names.
                        - Link **expenses** (e) to **expense_details** (ed) on 'e.id = ed.expense_id' for cost details.
            
                    - Always filter by **user_id = ${user_id}** to limit results to the current user.
                    - Status filters to include are: SUBMITTED, PENDING_APPROVAL, APPROVED, NOT_SUBMITTED.
                    - If asking for totals, provide only the sum as Total_Expense. For itemized details, include columns: Expense Item Name, Expense Category Name, Task Name, Pay Period, Pay Period Year, and Amount.
            
                    **Default Columns for Detailed Queries**: ${['Expense Item Name', 'Expense Category Name', 'Task Name', 'Pay Period', 'Pay Period Year', 'Amount']}.
                    - If additional fields are requested, add those to the result.
            
                    **Note**:
                    - If you’re unable to retrieve the specific data requested, respond with:
                      "I cannot provide the data requested. Here are example questions I can help with:
                       - 'What is my total expense for a given task?'
                       - 'What are the details of my expenses in the last pay period?'
                       - 'List my expenses by category and item for a given period.'"
                `;

            break;




        case 'timesheets':
            const timesheetTables = {
                timesheet: databaseSchemaContext.tables.timesheet,
                timesheetDetails: databaseSchemaContext.tables.timesheet_details,
                tasks: databaseSchemaContext.tables.tasks
            };
            specificPrompt = `
            **Timesheet Data Retrieval**:
            - Use **timesheet** and **timesheet_details** tables for time tracking.
            - Allowed columns for timesheet: ${timesheetTables.timesheet.columns.join(', ')}.
            - Allowed columns for timesheet details: ${timesheetTables.timesheetDetails.columns.join(', ')}.
            - Join **timesheet_details** with **tasks** on 'timesheet_details.task_id = tasks.id'.
            - Allowed columns for tasks: ${timesheetTables.tasks.columns.join(', ')}.
            - For user-specific timesheets, include 'user_id = ${user_id}'.`;
            break;

        default:
            specificPrompt = `
            **General Data Retrieval**:
            - Use relevant tables as per schema structure.
            - Ensure restricted columns are excluded and apply joins based on inferred relationships.`;
            break;
    }
    console.log(specificPrompt)
    return `${baseContext} ${specificPrompt}

    **Request**:
    Create the SQL query for the following request: "${query}"

    **Output Format**:
    Respond only with the SQL query, using exact column names without additional comments.`;
}

function fetchXpdofficeFeatures() {
    return `
    XPDOFFICE is an office management system designed to streamline workflows and improve productivity. Key features include:
    - **User Management**: Role and permission management.
    - **Expense Tracking**: Monitor expenses with detailed categorization.
    - **Time Tracking and Timesheets**: Log hours, manage project timelines, and approve timesheets.
    - **Project and Task Management**: Assign and track tasks with status updates and dependencies.
    - **Approvals and Workflow Automation**: Automated approval processes for tasks and expenses.
    Visit www.xpdoffice.com for further details.
    `;
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
        console.log('**********************')
        console.log(sqlQuery)
        console.log('**********************')
        const isSQLQuery = /(SELECT|INSERT|UPDATE|DELETE)\s+/i.test(sqlQuery);
        if (!isSQLQuery) return { response: sqlQuery };

        const queryMatch = sqlQuery.match(/SELECT\s+[\s\S]+?(;|$)/i);
        if (!queryMatch) throw new Error("Invalid SQL format in the response");

        const cleanSQLQuery = queryMatch[0].trim();
        // validateSQLQuery(cleanSQLQuery);
        console.log(cleanSQLQuery)
        const result = await db.sequelize.query(cleanSQLQuery, {
            raw: true,
            type: Sequelize.QueryTypes.SELECT,
            searchPath: schema
        });
        if (result && result.length == 0) {
            return 'No data available'
        }
        console.log(result)
        return result;
    } catch (error) {
        return 'No data available'
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
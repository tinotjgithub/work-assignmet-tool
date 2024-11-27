import { BedrockChat } from "@langchain/community/chat_models/bedrock";
import { DataSource } from "typeorm";

// Define a SQL Generation Tool
class SqlGenerationTool {
    constructor(schemaDescription) {
        this.schemaDescription = schemaDescription;
    }

    async generateSQL(queryDescription) {
        const model = new BedrockChat({
            model: "us.meta.llama3-2-1b-instruct-v1:0",
            region: "us-east-1",
            credentials: {
                accessKeyId: process.env.BEDROCK_ACCESS_KEY_ID,
                secretAccessKey: process.env.BEDROCK_SECRET_ACCESS_KEY
            }
        });

        // Provide a schema overview and instruct the model to infer the correct table
        const input = `
        You are a SQL expert. Based on the query description below, choose the appropriate table and generate SQL code.
        
        Schema Overview:
        ${this.schemaDescription}
        
        Query: "${queryDescription}"
        
        Only output the SQL code. Do not add explanations or comments.
        `;

        const response = await model.invoke(input);
        return response.content.trim(); // Return SQL directly
    }
}

async function getDatabaseSchema(dataSource) {
    const tables = await dataSource.query(`
        SELECT table_name, column_name
        FROM information_schema.columns
        WHERE table_schema = 'tenant_sssi';
    `);

    const schema = {};
    tables.forEach(row => {
        const tableName = row.table_name.toLowerCase();
        const columnName = row.column_name.toLowerCase();

        if (!schema[tableName]) {
            schema[tableName] = [];
        }
        schema[tableName].push(columnName);
    });

    return schema;
}

async function main() {
    const datasource = new DataSource({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "SSSIDEV",
        password: 'password1!',
        database: "postgres",
        schema: 'tenant_sssi'
    });
    await datasource.initialize();

    const schema = await getDatabaseSchema(datasource);
    const schemaDescription = Object.entries(schema)
        .map(([table, columns]) => `${table}: (${columns.join(", ")})`)
        .join("; ");

    console.log("Schema Description:", schemaDescription);

    // Create a tool for SQL generation
    const sqlTool = new SqlGenerationTool(schemaDescription);

    // Define the query description without specifying a table name
    const queryDescription = "List all account types";

    try {
        console.log(`Generating SQL for: "${queryDescription}"...`);
        const sqlQuery = await sqlTool.generateSQL(queryDescription);
        console.log(`Generated SQL Output: ${sqlQuery}`);
    } catch (error) {
        console.error("An error occurred while generating SQL:", error);
    }
}

setTimeout(() => {
    // main();
}, 2000);

// Budget Summary
export interface BudgetSummary {
	id: string;
	name: string;
	last_modified_on: string;
	first_month: string;
	last_month: string;
	date_format: DateFormat;
	currency_format: CurrencyFormat;
	accounts: Account[];
	payees: Payee[];
	payee_locations: PayeeLocation[];
	category_groups: CategoryGroup[];
	categories: Category[];
	months: Month[];
	transactions: Transaction[];
	subtransactions: Subtransaction[];
	scheduled_transactions: ScheduledTransaction[];
	scheduled_subtransactions: ScheduledSubtransaction[];
}

// Date Format
export interface DateFormat {
	format: string;
}

// Currency Format
export interface CurrencyFormat {
	iso_code: string;
	example_format: string;
	decimal_digits: number;
	decimal_separator: string;
	symbol_first: boolean;
	group_separator: string;
	currency_symbol: string;
	display_symbol: boolean;
}

// Account
export interface Account {
	id: string;
	name: string;
	type: string;
	on_budget: boolean;
	closed: boolean;
	note: string | null;
	balance: number;
	cleared_balance: number;
	uncleared_balance: number;
	transfer_payee_id: string;
	direct_import_linked: boolean;
	direct_import_in_error: boolean;
	last_reconciled_at: string | null;
	debt_original_balance: number;
	debt_interest_rates: Record<string, number>;
	debt_minimum_payments: Record<string, number>;
	debt_escrow_amounts: Record<string, number>;
	deleted: boolean;
}

// Transaction
export interface Transaction {
	id: string;
	date: string;
	amount: number;
	memo: string | null;
	cleared: string;
	approved: boolean;
	flag_color: string | null;
	flag_name: string;
	account_id: string;
	payee_id: string | null;
	category_id: string | null;
	transfer_account_id: string | null;
	transfer_transaction_id: string | null;
	matched_transaction_id: string | null;
	import_id: string | null;
	import_payee_name: string;
	import_payee_name_original: string;
	debt_transaction_type: string;
	deleted: boolean;
}

// Subtransaction
export interface Subtransaction {
	id: string;
	transaction_id: string;
	amount: number;
	memo: string | null;
	payee_id: string;
	payee_name: string;
	category_id: string;
	category_name: string;
	transfer_account_id: string | null;
	transfer_transaction_id: string | null;
	deleted: boolean;
}

// Scheduled Transaction
export interface ScheduledTransaction {
	id: string;
	date_first: string;
	date_next: string;
	frequency: string;
	amount: number;
	memo: string | null;
	flag_color: string | null;
	flag_name: string;
	account_id: string;
	payee_id: string | null;
	category_id: string | null;
	transfer_account_id: string | null;
	deleted: boolean;
}

// Scheduled Subtransaction
export interface ScheduledSubtransaction {
	id: string;
	scheduled_transaction_id: string;
	amount: number;
	memo: string | null;
	payee_id: string;
	category_id: string;
	transfer_account_id: string | null;
	deleted: boolean;
}

// Category
export interface Category {
	id: string;
	category_group_id: string;
	category_group_name: string;
	name: string;
	hidden: boolean;
	original_category_group_id: string | null;
	note: string | null;
	budgeted: number;
	activity: number;
	balance: number;
	goal_type: string | null;
	goal_needs_whole_amount: boolean | null;
	goal_day: number;
	goal_cadence: number;
	goal_cadence_frequency: number;
	goal_creation_month: string;
	goal_target: number;
	goal_target_month: string;
	goal_percentage_complete: number;
	goal_months_to_budget: number;
	goal_under_funded: number;
	goal_overall_funded: number;
	goal_overall_left: number;
	deleted: boolean;
}

// Payee
export interface Payee {
	id: string;
	name: string;
	transfer_account_id: string | null;
	deleted: boolean;
}

// Payee Location
export interface PayeeLocation {
	id: string;
	payee_id: string;
	latitude: string;
	longitude: string;
	deleted: boolean;
}

// Category Group
export interface CategoryGroup {
	id: string;
	name: string;
	hidden: boolean;
	deleted: boolean;
}

// Month
export interface Month {
	month: string;
	note: string | null;
	income: number;
	budgeted: number;
	activity: number;
	to_be_budgeted: number;
	age_of_money: number | null;
	deleted: boolean;
	categories: Category[];
}

// User
export interface User {
	id: string;
	email: string;
	name: string;
	deleted: boolean;
}

// Budget Summary Response
export interface BudgetSummaryResponse {
	data: {
		budgets: BudgetSummary[];
	};
}

// Single Budget Summary Response
export interface SingleBudgetSummaryResponse {
	data: {
		budget: BudgetSummary;
	};
}

// Account Response
export interface AccountResponse {
	data: {
		account: Account;
	};
}

// Accounts Response
export interface AccountsResponse {
	data: {
		accounts: Account[];
	};
}

// Transaction Response
export interface TransactionResponse {
	data: {
		transaction: Transaction;
	};
}

// Transactions Response
export interface TransactionsResponse {
	data: {
		transactions: Transaction[];
	};
}

// Category Response
export interface CategoryResponse {
	data: {
		category: Category;
	};
}

// Categories Response
export interface CategoriesResponse {
	data: {
		categories: Category[];
	};
}

// Payee Response
export interface PayeeResponse {
	data: {
		payee: Payee;
	};
}

// Payees Response
export interface PayeesResponse {
	data: {
		payees: Payee[];
	};
}

// Month Response
export interface MonthResponse {
	data: {
		month: Month;
	};
}

// Months Response
export interface MonthsResponse {
	data: {
		months: Month[];
	};
}

// User Response
export interface UserResponse {
	data: {
		user: User;
	};
}

// Error Detail
export interface ErrorDetail {
	id: string;
	name: string;
	detail: string;
}

// Error Response
export interface ErrorResponse {
	error: ErrorDetail;
}

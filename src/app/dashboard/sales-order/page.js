"use client";
import {useState} from 'react'
import Link from "next/link";
import SaleOrderList from "@/components/dashboard/SaleOrderList";
import Specimen from "@/components/dashboard/Specimen";

const page = () => {
	const [current, setCurrent] = useState("sales")

	return (
		<div>
			<div className='flex gap-8 items-center mb-5 ml-3'>
				<h1 className='text-2xl capitalize'>
					{current === "sales" ? "sales order list" : "Speciman Order List"}
				</h1>
				<div className='flex gap-4'>
					<div
						className='flex gap-2 items-center'
						onClick={() => {
							if (current !== "sales") {
								setCurrent("sales");
							}
						}}
					>
						<input
							id='sales'
							type='checkbox'
							checked={current === "sales"}
							className='rounded-full'
						/>
						<label
							className={`${
								current === "sales" ? "text-xl font-semibold" : "text-xl"
							}`}
							htmlFor='sales'
						>
							Sales Order
						</label>
					</div>
					<div
						className='flex gap-2 items-center'
						onClick={() => {
							if (current !== "speciman") {
								setCurrent("speciman");
							}
						}}
					>
						<input
							id='speciman'
							type='checkbox'
							checked={current === "speciman"}
							className='rounded-full'
						/>
						<label
							className={`${
								current === "speciman" ? "text-xl font-semibold" : "text-xl"
							}`}
							htmlFor='speciman'
						>
							Speciman Order
						</label>
					</div>
				</div>
			</div>
			<div className='flex justify-between items-center'>
				{current === "sales" ? (
					<Link href='/dashboard/sales-order/add/sales'>
						<button className='capitalize bg-primary1 px-2 py-1 text-white rounded-md ml-3'>
							Add Sales Order
						</button>
					</Link>
				) : (
					<Link href='/dashboard/sales-order/add/speciman'>
						<button className='capitalize bg-primary1 px-2 py-1 text-white rounded-md ml-5'>
							Add Speciman Order
						</button>
					</Link>
				)}

				<form>
					<input
						name='search'
						type='text'
						placeholder='Search'
						className='text-md outline-1 border-1 focus:ring-0 rounded-md w-[250px] text-sm mr-5'
					/>
				</form>
			</div>
			{current === "sales" ? <SaleOrderList />
			 : <Specimen />}
		</div>
	);
};

export default page;

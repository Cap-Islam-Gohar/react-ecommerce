import { Fragment, useState } from 'react'
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
} from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, NavLink } from 'react-router-dom'
import { BuildingStorefrontIcon } from '@heroicons/react/24/solid'
import { clsx } from '../../Helpers';
import { useCartQuery } from '../../Redux/Api/Service'
import { useSelector } from 'react-redux'
import Logout from '../Auth/Logout'
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/20/solid'


export default function Navigation() {
	
	const [open, setOpen] = useState(false)

	// const auth = useAuth();
	const { token } = useSelector(state => state.auth);

    const {data :cart = {}, error, isLoading, isError} = token && useCartQuery();

    const { quantity } =  cart;

	return (
		<div className="bg-white">
			{/* Mobile menu */}
			<Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
				<DialogBackdrop
					transition
					className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
				/>

				<div className="fixed inset-0 z-40 flex">
					<DialogPanel
						transition
						className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
					>
						<div className="flex px-4 pb-2 pt-5">
							<button
								type="button"
								onClick={() => setOpen(false)}
								className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
							>
								<span className="absolute -inset-0.5" />
								<span className="sr-only">Close menu</span>
								<XMarkIcon aria-hidden="true" className="h-6 w-6" />
							</button>
						</div>

						<div className="space-y-6 border-t border-gray-200 px-4 py-6">
							{[
								['Home', '/'],
								['Categories', '/categories'],
								['Brands', '/brands'],
								['Wishlist', '/Wishlist'],
							].map(([title, url], i) => (
								<div key={i} className="flow-root">
									<NavLink to={url} key={i} 
										className={ ({ isActive }) => clsx(
											"-m-2 block p-2 font-medium", 
											isActive ? "text-gray-100 bg-gray-900" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
										)}>
										{title}
									</NavLink>
								</div>
							))}
						</div>

						<div className="space-y-6 border-t border-gray-200 px-4 py-6">
							<div className="flow-root">
								{token ? <>
									<div className="flow-root">
										<Logout className="-m-2 block p-2 font-medium text-gray-900">
											Sign Out
											<ArrowRightStartOnRectangleIcon className="h-6 w-6 ml-1" />        
										</Logout>
									</div>
									</> : <>
										<div className="flow-root">
											<Link to="login" className="-m-2 block p-2 font-medium text-gray-900">
												Sign in
											</Link>
										</div>
										<div className="flow-root">
											<Link to="register" className="-m-2 block p-2 font-medium text-gray-900">
												Sign in
											</Link>
										</div>
									</>
								}
							</div>
							<div className="flow-root">
								<a href="#" className="-m-2 block p-2 font-medium text-gray-900">
									Sign in
								</a>
							</div>
							<div className="flow-root">
								<a href="#" className="-m-2 block p-2 font-medium text-gray-900">
									Create account
								</a>
							</div>
						</div>
					</DialogPanel>
				</div>
			</Dialog>

			<header className="relative bg-white">
				<p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
					Get free delivery on orders over $100
				</p>

				<nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="border-b border-gray-200">
						<div className="flex h-16 items-center">
							<button
								type="button"
								onClick={() => setOpen(true)}
								className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
							>
								<span className="absolute -inset-0.5" />
								<span className="sr-only">Open menu</span>
								<Bars3Icon aria-hidden="true" className="h-6 w-6" />
							</button>

							{/* Logo */}
							<div className="ml-4 flex lg:ml-0">
								<Link to="/">
									<span className="sr-only">Company Name</span>
									<BuildingStorefrontIcon className="h-8 w-auto text-pink-700" ></BuildingStorefrontIcon>
								</Link>
							</div>

							{/* Flyout menus */}
							<div className="hidden lg:ml-8 lg:block lg:self-stretch">
								<div className="flex h-full space-x-8">
									{[
										['Home', ''],
										['Categories', '/categories'],
										['Brands', '/brands'],
										['Wishlist', '/Wishlist'],
									].map(([title, url], i) => (
										<NavLink
											to={url}
											key={i}
											className={({ isActive }) => clsx(
												"rounded-lg px-3 py-2 font-medium",
												isActive ? "text-slate-100 bg-slate-900" : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
											)}>
											{title}
										</NavLink>
									))}
								</div>
							</div>

							<div className="ml-auto flex items-center">
								<div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
								{token ? <>
									<Logout className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
										Sign Out
										<ArrowRightStartOnRectangleIcon className="h-6 w-6 ml-1" />        
									</Logout>
									</> : <><Link to="login" className="text-sm font-medium text-gray-700 hover:text-gray-800">Sign in</Link>
									<span className="h-6 w-px bg-gray-200" aria-hidden="true"></span>
										<Link to="register" className="text-sm font-medium text-gray-700 hover:text-gray-800">Create account</Link>
									</>
								}
								</div>

								{/* Search */}
								<div className="flex lg:ml-6">
									<a href="#" className="p-2 text-gray-400 hover:text-gray-500">
										<span className="sr-only">Search</span>
										<MagnifyingGlassIcon aria-hidden="true" className="h-6 w-6" />
									</a>
								</div>

								{/* Cart */}
								<div className="ml-4 flow-root lg:ml-6">
									<Link to={'/cart'} className="group -m-2 flex items-center p-2">
										<ShoppingBagIcon
											aria-hidden="true"
											className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
										/>
										<span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{ quantity }</span>
										<span className="sr-only">items in cart, view bag</span>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</nav>
			</header>
		</div>
	)
}

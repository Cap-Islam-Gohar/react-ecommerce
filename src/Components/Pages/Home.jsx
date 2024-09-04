import ProductsList from "../Ui/ProductsList";

export default function Home() {    

    return (<>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
                <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-h-2 sm:aspect-w-3 sm:col-span-2 sm:row-span-2">
                    <img
                        src="https://tailwindui.com/img/ecommerce-images/home-page-03-featured-category.jpg"
                        alt="Two models wearing women's black cotton crewneck tee and off-white cotton crewneck tee."
                        className="object-cover object-top group-hover:opacity-75"
                    />
                    <div aria-hidden="true" className="bg-gradient-to-b from-transparent to-black opacity-50" />
                    <div className="flex items-end p-6">
                        <div>
                            <h3 className="font-semibold text-white">
                                <a href="#">
                                    <span className="absolute inset-0" />
                                    New Arrivals
                                </a>
                            </h3>
                            <p aria-hidden="true" className="mt-1 text-sm text-white">
                                Shop now
                            </p>
                        </div>
                    </div>
                </div>
                <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full">
                    <img
                        src="https://tailwindui.com/img/ecommerce-images/home-page-03-category-01.jpg"
                        alt="Wooden shelf with gray and olive drab green baseball caps, next to wooden clothes hanger with sweaters."
                        className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
                    />
                    <div
                        aria-hidden="true"
                        className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
                    />
                    <div className="flex items-end p-6 sm:absolute sm:inset-0">
                        <div>
                            <h3 className="font-semibold text-white">
                                <a href="#">
                                    <span className="absolute inset-0" />
                                    Accessories
                                </a>
                            </h3>
                            <p aria-hidden="true" className="mt-1 text-sm text-white">
                                Shop now
                            </p>
                        </div>
                    </div>
                </div>
                <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full">
                    <img
                        src="https://tailwindui.com/img/ecommerce-images/home-page-03-category-02.jpg"
                        alt="Walnut desk organizer set with white modular trays, next to porcelain mug on wooden desk."
                        className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
                    />
                    <div
                        aria-hidden="true"
                        className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
                    />
                    <div className="flex items-end p-6 sm:absolute sm:inset-0">
                        <div>
                            <h3 className="font-semibold text-white">
                                <a href="#">
                                    <span className="absolute inset-0" />
                                    Workspace
                                </a>
                            </h3>
                            <p aria-hidden="true" className="mt-1 text-sm text-white">
                                Shop now
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <ProductsList />
        </div>
    </>)
}
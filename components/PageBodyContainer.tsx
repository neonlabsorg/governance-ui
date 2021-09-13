const PageBodyContainer = ({ children }) => (
  <div className="min-h-screen grid grid-cols-12 gap-4 relative">
    <div className="col-span-12 px-4 xl:col-start-2 xl:col-span-10 relative z-10">
      {children}
    </div>
    <div className="fixed top-0 bottom-0 left-0 right-0 margin-auto flex items-center justify-center  z-0">
      <img src="/common_grid.svg" alt="#" className="opacity-25" />
    </div>
  </div>
)

export default PageBodyContainer

// import { usePagination } from '@/hooks/usePagination'
// import { LessIcon, MoreIcon } from '@/components/assets/iconsDesktop'

// const PaginationDesktop = ({ totalPages, currentPage, onPageChange, visibleCount = 7 }) => {
//     const { visibleStart, visibleEnd, lessDisabled, moreDisabled } = usePagination({
//         totalPages,
//         currentPage,
//         visibleCount,
//     })

//     return (
//         <div className="flex gap-2">
//             <LessIcon
//                 className={lessDisabled ? 'opacity-50' : ''}
//                 onClick={lessDisabled ? undefined : () => onPageChange(currentPage - 1)}
//             />
//             {[...Array(visibleEnd - visibleStart + 1)].map((_, idx) => {
//                 const pageNumber = visibleStart + idx
//                 return (
//                     <button
//                         key={pageNumber}
//                         className={currentPage === pageNumber ? 'font-bold underline' : ''}
//                         onClick={() => {
//                             if (pageNumber !== currentPage) onPageChange(pageNumber)
//                         }}
//                     >
//                         {pageNumber}
//                     </button>
//                 )
//             })}
//             <MoreIcon
//                 className={moreDisabled ? 'opacity-50' : ''}
//                 onClick={moreDisabled ? undefined : () => onPageChange(currentPage + 1)}
//             />
//         </div>
//     )
// }

// export default PaginationDesktop

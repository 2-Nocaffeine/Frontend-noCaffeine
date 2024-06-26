type ClipNumsType = {
  [key: string]: number
}

type ClipNavbarProps = {
  clipNums: ClipNumsType
}

export default function ClipNavbar() {
  return (
    <nav className="text-[14px] bg-[#F5F5F5]">
      <ul className="px-4 py-5 flex flex-row gap-3">
        <li>
          <button>
            <span>상품</span>
          </button>
        </li>
        <li>
          <span>브랜드&스토어</span>
        </li>
        <li>
          <span>카테고리</span>
        </li>
      </ul>
    </nav>
  )
}

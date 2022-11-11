import Icon from "@ant-design/icons"
import {CustomIconComponentProps} from "@ant-design/icons/lib/components/Icon"

const ArrowLeft = () => (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
            d='M6.66667 12.6666L2 7.99998M2 7.99998L6.66667 3.33331M2 7.99998L14 7.99998'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
    </svg>
)

/**
 * @description:  向左的箭头
 */
export const ArrowLeftIcon = (props: Partial<CustomIconComponentProps>) => {
    return <Icon component={ArrowLeft} {...props} />
}

const Plus = () => (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
            d='M7.99996 2.66669V13.3334M13.3333 8.00002L2.66663 8.00002'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
    </svg>
)

/**
 * @description:  +
 */
export const PlusIcon = (props: Partial<CustomIconComponentProps>) => {
    return <Icon component={Plus} {...props} />
}

const Drag = () => (
    <svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'>
        <path
            d='M4.2 3.60001C3.53726 3.60001 3 3.06275 3 2.40001C3 1.73727 3.53726 1.20001 4.2 1.20001C4.86274 1.20001 5.4 1.73727 5.4 2.40001C5.4 3.06275 4.86274 3.60001 4.2 3.60001Z'
            fill='currentColor'
        />
        <path
            d='M4.2 7.20001C3.53726 7.20001 3 6.66275 3 6.00001C3 5.33727 3.53726 4.80001 4.2 4.80001C4.86274 4.80001 5.4 5.33727 5.4 6.00001C5.4 6.66275 4.86274 7.20001 4.2 7.20001Z'
            fill='currentColor'
        />
        <path
            d='M4.2 10.8C3.53726 10.8 3 10.2628 3 9.60001C3 8.93727 3.53726 8.40001 4.2 8.40001C4.86274 8.40001 5.4 8.93727 5.4 9.60001C5.4 10.2628 4.86274 10.8 4.2 10.8Z'
            fill='currentColor'
        />
        <path
            d='M7.79998 3.60001C7.13723 3.60001 6.59998 3.06275 6.59998 2.40001C6.59998 1.73727 7.13723 1.20001 7.79998 1.20001C8.46272 1.20001 8.99998 1.73727 8.99998 2.40001C8.99998 3.06275 8.46272 3.60001 7.79998 3.60001Z'
            fill='currentColor'
        />
        <path
            d='M7.79998 7.20001C7.13723 7.20001 6.59998 6.66275 6.59998 6.00001C6.59998 5.33727 7.13723 4.80001 7.79998 4.80001C8.46272 4.80001 8.99998 5.33727 8.99998 6.00001C8.99998 6.66275 8.46272 7.20001 7.79998 7.20001Z'
            fill='currentColor'
        />
        <path
            d='M7.79998 10.8C7.13723 10.8 6.59998 10.2628 6.59998 9.60001C6.59998 8.93727 7.13723 8.40001 7.79998 8.40001C8.46272 8.40001 8.99998 8.93727 8.99998 9.60001C8.99998 10.2628 8.46272 10.8 7.79998 10.8Z'
            fill='currentColor'
        />
    </svg>
)

/**
 * @description:  拖拽排序
 */
export const DragIcon = (props: Partial<CustomIconComponentProps>) => {
    return <Icon component={Drag} {...props} />
}

const Photograph = () => (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M4.80002 3.59998C3.47454 3.59998 2.40002 4.67449 2.40002 5.99998V18C2.40002 19.3255 3.47454 20.4 4.80002 20.4H19.2C20.5255 20.4 21.6 19.3255 21.6 18V5.99998C21.6 4.67449 20.5255 3.59998 19.2 3.59998H4.80002ZM19.2 18H4.80002L9.60002 8.39998L13.2 15.6L15.6 10.8L19.2 18Z'
            fill='currentColor'
        />
    </svg>
)

/**
 * @description:  Photograph 图片
 */
export const PhotographIcon = (props: Partial<CustomIconComponentProps>) => {
    return <Icon component={Photograph} {...props} />
}

const Trash = () => (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
            d='M12.6667 4.66667L12.0885 12.7617C12.0387 13.4594 11.4581 14 10.7586 14H5.24157C4.54205 14 3.96147 13.4594 3.91163 12.7617L3.33341 4.66667M6.66675 7.33333V11.3333M9.33341 7.33333V11.3333M10.0001 4.66667V2.66667C10.0001 2.29848 9.7016 2 9.33341 2H6.66675C6.29856 2 6.00008 2.29848 6.00008 2.66667V4.66667M2.66675 4.66667H13.3334'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
    </svg>
)

/**
 * @description:  垃圾桶删除
 */
export const TrashIcon = (props: Partial<CustomIconComponentProps>) => {
    return <Icon component={Trash} {...props} />
}

const Search = () => (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
            d='M14 14L10 10M11.3333 6.66667C11.3333 9.244 9.244 11.3333 6.66667 11.3333C4.08934 11.3333 2 9.244 2 6.66667C2 4.08934 4.08934 2 6.66667 2C9.244 2 11.3333 4.08934 11.3333 6.66667Z'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
    </svg>
)

/**
 * @description:  搜索
 */
export const SearchIcon = (props: Partial<CustomIconComponentProps>) => {
    return <Icon component={Search} {...props} />
}

const QuestionCircle = () => (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
            d='M5.48511 6C5.85118 5.22321 6.83895 4.66667 8.00004 4.66667C9.4728 4.66667 10.6667 5.5621 10.6667 6.66667C10.6667 7.59963 9.81496 8.38338 8.66285 8.6044C8.30125 8.67377 8.00004 8.96514 8.00004 9.33333M8 11.3333H8.00667M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
    </svg>
)

/**
 * @description:  疑问，圆里面一个问号
 */
export const QuestionCircleIcon = (props: Partial<CustomIconComponentProps>) => {
    return <Icon component={QuestionCircle} {...props} />
}

const Close = () => (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
            d='M5.48511 6C5.85118 5.22321 6.83895 4.66667 8.00004 4.66667C9.4728 4.66667 10.6667 5.5621 10.6667 6.66667C10.6667 7.59963 9.81496 8.38338 8.66285 8.6044C8.30125 8.67377 8.00004 8.96514 8.00004 9.33333M8 11.3333H8.00667M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
    </svg>
)

/**
 * @description:  x 关闭
 */
export const CloseIcon = (props: Partial<CustomIconComponentProps>) => {
    return <Icon component={Close} {...props} />
}

const Ban = () => (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
            d='M18.364 18.364C21.8787 14.8492 21.8787 9.15076 18.364 5.63604C14.8492 2.12132 9.15076 2.12132 5.63604 5.63604M18.364 18.364C14.8492 21.8787 9.15076 21.8787 5.63604 18.364C2.12132 14.8492 2.12132 9.15076 5.63604 5.63604M18.364 18.364L5.63604 5.63604'
            strokeWidth='2'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
    </svg>
)

/**
 * @description:禁止
 */
export const BanIcon = (props: Partial<CustomIconComponentProps>) => {
    return <Icon component={Ban} {...props} />
}

const PlusCircle = () => (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
            d='M12 9V12M12 12V15M12 12H15M12 12H9M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z'
            stroke='#111827'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
        />
    </svg>
)

/**
 * @description:加圈的+
 */
export const PlusCircleIcon = (props: Partial<CustomIconComponentProps>) => {
    return <Icon component={PlusCircle} {...props} />
}

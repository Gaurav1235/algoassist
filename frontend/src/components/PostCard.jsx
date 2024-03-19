export const PostCard = ({
    authorName,
    title,
    content,
    publishedDate
}) => {
    return <div>
        <div>
            {authorName} - {publishedDate}
        </div>
        <div>
            {title}
        </div>
    </div>
}
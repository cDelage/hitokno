function TitleFormatToolbar({node} : {node? : string}) : JSX.Element{
    if(node === "h1") return <strong>Heading 1</strong>;
    if(node === "h2") return <strong>Heading 2</strong>;
    if(node === "h3") return <strong>Heading 3</strong>;
    if(node === "ul") return <div>Bullet list</div>;
    if(node === "ol") return <div>Number list</div>;

    return <div>Normal</div>
}

export default TitleFormatToolbar
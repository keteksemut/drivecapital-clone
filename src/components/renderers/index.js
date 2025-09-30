import { Link } from '@/components/link';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import st from "./renderers.module.css";

export const renderParagraphWithStyle = ({ json }) => {
    const options = {
        renderNode: {
            [BLOCKS.PARAGRAPH]: function (node) {
                return <p className="p-l">{node.content[0].value}</p>;
            },
            [INLINES.HYPERLINK]: function (node) {
                return (
                    <Link
                        href={node.data.uri}
                        className={`${st.link} link`}>
                        {node.content[0].value}
                    </Link>
                );
            }
        }
    };
    return documentToReactComponents(json, options);
};

export const renderParagraphWithLink = ({ json }) => {
    const options = {
        renderNode: {
            [BLOCKS.PARAGRAPH]: function (node) {
                return <p className="p">{node.content[0].value}</p>;
            },
            [INLINES.HYPERLINK]: function (node) {
                return (
                    <Link
                        href={node.data.uri}
                        className="link underlined">
                        {node.content[0].value}
                    </Link>
                );
            }
        }
    };
    return documentToReactComponents(json, options);
};

export const renderContentWithHeadingAndLink = ({ json }) => {
    const options = {
        renderNode: {
            [BLOCKS.HEADING_3]: function (node) {
                return <h3 className="h3">{node.content[0].value}</h3>;
            },
            [BLOCKS.HEADING_6]: function (node) {
                return <h6 className="p-l">{node.content[0].value}</h6>;
            },
            [BLOCKS.PARAGRAPH]: function (node) {
                return <p className="p">{node.content[0].value}</p>;
            },
            [INLINES.HYPERLINK]: function (node) {
                return (
                    <Link
                        href={node.data.uri}
                        className={`${st.link} link`}>
                        {node.content[0].value}
                    </Link>
                );
            }
        }
    };
    return documentToReactComponents(json, options);
};
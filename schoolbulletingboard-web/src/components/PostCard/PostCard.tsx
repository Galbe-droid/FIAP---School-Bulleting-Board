import {Card, CardContent, Chip, Typography} from "@mui/material";
import type {ReturnPostDto} from "../../types/Post/ReturnPostDto.ts";
import {getUserById} from "../../services/userService.ts";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

interface PostCardProps {
    post: ReturnPostDto;
}

export default function PostCard({ post }: PostCardProps) {
    const [author, setAuthor] = useState<string>("");
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/posts/${post.id}`);
    };

    useEffect(() => {
        const getAuthor = async(id: string) => {
            try{
                const user = await getUserById(id);
                setAuthor(user.username);
            }catch(error){
                console.error(error);
            }
        }

        getAuthor(post.authorId);

    }, [post.authorId]);

    return(
        <Card
            onClick={handleClick}
            sx={{
                cursor: "pointer",
                transition: "0.2s",

                "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 4,
                },
            }}
        >
            <CardContent>
                <Typography
                    variant={"h6"}
                    component="h2"
                    gutterBottom={true}
                >
                    {post.title}
                </Typography>
                <Typography
                    variant={"body2"}
                    color={"textSecondary"}
                    sx={{
                        mb: 2,
                        display: "-webkit-box",
                        WebkitLineClamp: "3",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}
                >
                    {post.content}
                </Typography>
                <Chip
                    label={post.status}
                    size="small"
                />
                <Typography
                    variant="caption"
                    color={"textSecondary"}
                    sx={{
                        mt: 1,
                        display: "block"
                    }}
                >
                    Autor: {author}
                </Typography>

            </CardContent>
        </Card>
    );
}
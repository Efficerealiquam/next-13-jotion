"use client"

import { useMutation } from 'convex/react'
import { useQuery } from 'convex/react'

import { Doc, Id } from "@/convex/_generated/dataModel"
import { api } from '@/convex/_generated/api'
import { useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useParams } from 'next/navigation'

interface TitleProps {
    initialData: Doc<"documents">
}


export const Title = ({ initialData }: TitleProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const params = useParams();
    const update = useMutation(api.documents.update);
    const getParentString = useQuery(api.documents.getParents,{
        id: params.documentId as Id<"documents">
    });

    const [title, setTitle] = useState(initialData.title || "Untitled");
    const [isEditing, setIsEditing] = useState(false);

    const enableInput = () => {
        setTitle(initialData.title);
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
        }, 0)
    }

    const disableInput = () => {
        setIsEditing(false);
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
        update({
            id: initialData._id,
            title: event.target.value || "Untitled"
        })
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            disableInput();
        }
    }
    return (
        <div className='flex items-center gap-x-1' >
            {!!getParentString && <p>{getParentString}</p>}
            {!!initialData.icon && <p>{initialData.icon}</p>}
            {isEditing ? (
                <Input
                    ref={inputRef}
                    onClick={enableInput}
                    onBlur={disableInput}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={title}
                    className="h-7 px-2 focus-visible:ring-transparent w-[200px]"
                />
            ) : (
                <Button
                    onClick={enableInput}
                    variant="ghost"
                    size="sm"
                    className='font-normal h-auto p-1'
                >
                    <span className='truncate' >
                        {initialData?.title}
                    </span>
                </Button>
            )}
        </div>
    )
}

Title.Skeleton = function TitleSkeleton(){
    return (
        <Skeleton className='h-9 w-80 rounded-md' />
    )
}
import Image from "next/image";

 interface AvatarProps {
    name?: string | null | undefined;
    image?: string | null | undefined;
}

export default function Avatar({ name, image }: AvatarProps) {
    const getInitials = (name: string) => {
        const parts = name.split(' ');
        const initias = parts.map(part => part.charAt(0).toUpperCase());
        return initias.join('');
    }

    return (
        <div className="flex items-center space-x-3">
            {image ? (
                <Image
                    className="h-10 w-10 rounded-full"
                    src={image}
                    alt={name || 'User Avatar'}
                    width={40}
                    height={40}
                />
            ) : (
                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-600 font-medium">
                        {getInitials(name || 'User')}
                    </span>
                </div>
            )}
        </div>
    );
}
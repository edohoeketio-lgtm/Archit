import AVFoundation
import CoreImage
import Foundation

let fileURL = URL(fileURLWithPath: "Screen_Recording.mp4")
let asset = AVURLAsset(url: fileURL)
let generator = AVAssetImageGenerator(asset: asset)
generator.appliesPreferredTrackTransform = true
generator.requestedTimeToleranceBefore = .zero
generator.requestedTimeToleranceAfter = .zero

let duration = asset.duration.seconds
let frameCount = 30
let folderURL = URL(fileURLWithPath: "frames")

do {
    try FileManager.default.createDirectory(at: folderURL, withIntermediateDirectories: true)
} catch {
    print("Error creating directory: \(error)")
}

print("Extracting \(frameCount) frames over \(duration) seconds...")

for index in 0..<frameCount {
    let time = (duration / Double(frameCount - 1)) * Double(index)
    let cmTime = CMTime(seconds: time, preferredTimescale: 600)
    do {
        let cgImage = try generator.copyCGImage(at: cmTime, actualTime: nil)
        let context = CIContext()
        let ciImage = CIImage(cgImage: cgImage)
        
        let formattedIndex = String(format: "%03d", index)
        let url = folderURL.appendingPathComponent("frame_\(formattedIndex).png")
        
        if let colorSpace = cgImage.colorSpace {
            try context.writePNGRepresentation(of: ciImage, to: url, format: .RGBA8, colorSpace: colorSpace)
        }
    } catch {
        print("Failed at \(time)s: \(error)")
    }
}
print("Done")
